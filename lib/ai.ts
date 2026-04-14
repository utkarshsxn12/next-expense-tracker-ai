// utils/ai.ts
import OpenAI from 'openai';

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'X-Title': 'ExpenseTracker AI',
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-User-ID': process.env.UNIQUE_USER_ID || 'dev-1',
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

/**
 * Helper: strip markdown fences and trim
 */
function stripFences(text: string) {
  let s = text.trim();
  if (s.startsWith('```json')) s = s.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  else if (s.startsWith('```')) s = s.replace(/^```\s*/, '').replace(/\s*```$/, '');
  return s.trim();
}

function safeParseJsonArray<T>(text: string): T[] {
  const cleaned = stripFences(text);

  // Quick attempt: if it already starts with [ parse
  try {
    if (cleaned.trim().startsWith('[')) {
      return JSON.parse(cleaned);
    }
    // If it's a single object, wrap it as an array
    if (cleaned.trim().startsWith('{')) {
      return [JSON.parse(cleaned)];
    }
  } catch (err) {
    // fallthrough to more tolerant attempts
  }

  // Last-ditch heuristics: try to find first bracketed JSON array substring
  const match = cleaned.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      // final fallback -> throw so caller can fallback
      throw new Error('Could not parse JSON array from model response.');
    }
  }

  throw new Error('No JSON array found in response.');
}

export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  const expensesSummary = expenses.map((e) => ({
    amount: e.amount,
    category: e.category,
    description: e.description,
    date: e.date,
  }));

  const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.

IMPORTANT:
- Always use INR (₹) as the currency.
- Never use $, USD, dollars, or any foreign currency.
- If calculating totals, estimations, or savings, ALWAYS prefix values with ₹.
- Keep amounts accurate and based on the provided data.

Return a JSON array of insights with this exact structure (and ONLY the JSON array):

[
  {
    "type": "warning|info|success|tip",
    "title": "brief title",
    "message": "detailed insight message using ₹ currency",
    "action": "actionable suggestion",
    "confidence": 0.0
  }
]

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Focus on:
1. Spending patterns (day of week, categories)
2. Budget alerts (high spending areas)
3. Money-saving opportunities
4. Positive reinforcement for good habits
5. All values must be represented in Indian Rupees (₹).

Return only valid JSON.`;


  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat', // use a stable model
      messages: [
        { role: 'system', content: 'You are a helpful assistant that outputs only JSON when asked.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 400,
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) throw new Error('Empty response from AI');

    let parsed: RawInsight[];
    try {
      parsed = safeParseJsonArray<RawInsight>(raw);
    } catch (parseErr) {
      console.error('AI JSON parse error:', parseErr, { rawResponse: raw });
      throw parseErr;
    }

    const formattedInsights: AIInsight[] = parsed.map((insight, i) => ({
      id: `ai-${Date.now()}-${i}`,
      type: (insight.type as any) || 'info',
      title: insight.title || 'AI Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: typeof insight.confidence === 'number' ? insight.confidence : 0.8,
    }));

    return formattedInsights;
  } catch (err) {
    console.error('❌ Error generating AI insights:', err);
    // Fallback
    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: 'AI Analysis Unavailable',
        message: 'Unable to generate personalized insights at this time. Try again later.',
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            'You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with only the category name (one word).',
        },
        { role: 'user', content: `Categorize this expense: "${description}"` },
      ],
      temperature: 0.0,
      max_tokens: 10,
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() || '';
    // Normalize capitalization and trim punctuation
    const candidate = raw.replace(/[^a-zA-Z]/g, '').replace(/\s+/g, '');
    const validCategories = [
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Bills',
      'Healthcare',
      'Other',
    ];
    // Try to match case-insensitively
    const matched = validCategories.find((c) => c.toLowerCase() === candidate.toLowerCase());
    return matched || 'Other';
  } catch (err) {
    console.error('❌ Error categorizing expense:', err);
    return 'Other';
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  const expensesSummary = context.map((e) => ({
    amount: e.amount,
    category: e.category,
    description: e.description,
    date: e.date,
  }));

  const prompt = `Based on the following expense data, answer this question concisely (2-3 sentences). 
Use concrete numbers from the data when possible.

IMPORTANT RULES:
- Always use INR (₹) when mentioning money.
- Never use $, USD, dollars, or any foreign currency.
- If estimating totals or giving advice, ALWAYS use ₹.
- Keep the response professional and financial-advisor style.

Question: "${question}"

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Return only the plain answer text, no JSON or extra formatting.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful financial advisor AI. Provide concise, actionable answers using the data provided.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices?.[0]?.message?.content;
    if (!response) throw new Error('No response from AI');
    return response.trim();
  } catch (err) {
    console.error('❌ Error generating AI answer:', err);
    return "I'm unable to provide a detailed answer at the moment. Please try refreshing or check your connection.";
  }
}
