'use client';

import { useState, useEffect } from 'react';
import { getAIInsights } from '@/app/actions/getAIInsights';
import { generateInsightAnswer } from '@/app/actions/generateInsightAnswer';

interface InsightData {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

interface AIAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const newInsights = await getAIInsights();
      setInsights(newInsights);
      setLastUpdated(new Date());
    } catch (error) {
      setInsights([
        {
          id: 'fallback-1',
          type: 'info',
          title: 'AI Temporarily Unavailable',
          message:
            "We're working to restore AI insights. Please check back soon.",
          action: 'Try again later',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = async (insight: InsightData) => {
    if (!insight.action) return;

    const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
    if (existingAnswer) {
      setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
      return;
    }

    setAiAnswers((prev) => [
      ...prev,
      {
        insightId: insight.id,
        answer: '',
        isLoading: true,
      },
    ]);

    try {
      const question = `${insight.title}: ${insight.action}`;
      const answer = await generateInsightAnswer(question);

      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id ? { ...a, answer, isLoading: false } : a
        )
      );
    } catch {
      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id
            ? {
                ...a,
                answer:
                  'Sorry, I was unable to generate an answer. Please try again.',
                isLoading: false,
              }
            : a
        )
      );
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  // ICONS
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'tip':
        return '💡';
      case 'info':
        return 'ℹ️';
      default:
        return '🤖';
    }
  };

  // CARD COLORS (BLUE THEME)
  const getInsightColors = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'tip':
      case 'info':
        return 'border-l-[#00AEEF] bg-[#D7F6FF]/20 dark:bg-blue-900/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-800/50';
    }
  };

  // BUTTON COLORS (BLUE THEME EXCEPT SUCCESS + WARNING)
  const getButtonColors = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-300 hover:text-yellow-500';
      case 'success':
        return 'text-green-700 dark:text-green-300 hover:text-green-500';
      case 'tip':
      case 'info':
        return 'text-[#00AEEF] hover:text-[#0096D1]';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Loading...';

    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    const mins = Math.floor(diff / 60000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;

    return lastUpdated.toLocaleDateString();
  };

  // -------------------------
  // LOADING SKELETON
  // -------------------------
if (isLoading) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40">

      {/* HEADER — RESTORED */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🤖</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              AI Insights
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Analyzing your spending patterns
            </p>
          </div>
        </div>

        {/* SPINNING ANALYZING INDICATOR */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-[#00AEEF]/40 border-t-[#00AEEF] rounded-full animate-spin"></div>
          <span className="text-xs text-[#00AEEF] dark:text-blue-300 font-medium hidden sm:block">
            Analyzing...
          </span>
        </div>
      </div>

      {/* SKELETON LIST */}
      <div className="space-y-3 sm:space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-blue-900/20 rounded-xl border border-blue-700/20 p-4"
          >
            <div className="space-y-3">
              <div className="h-2.5 bg-blue-700/40 rounded w-3/4"></div>
              <div className="h-2.5 bg-blue-700/40 rounded w-full"></div>
              <div className="h-2.5 bg-blue-700/40 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ANALYZING BAR */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-[#00AEEF] rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          AI is analyzing your financial patterns...
        </span>
      </div>
    </div>
  );
}


  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40'>

      {/* HEADER */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-[#00AEEF] via-[#0096D1] to-[#007EAA] rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-white text-lg'>🤖</span>
          </div>

          <div>
            <h3 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100'>
              AI Insights
            </h3>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              AI financial analysis
            </p>
          </div>
        </div>

        <button
          onClick={loadInsights}
          className='w-8 h-8 bg-gradient-to-br from-[#00AEEF] to-[#0096D1] hover:from-[#0096D1] hover:to-[#007EAA] text-white rounded-xl shadow-lg flex items-center justify-center transition'
        >
          🔄
        </button>
      </div>

      {/* INSIGHTS GRID */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {insights.map((insight) => {
          const currentAnswer = aiAnswers.find(
            (a) => a.insightId === insight.id
          );

          return (
            <div
              key={insight.id}
              className={`rounded-xl p-4 border-l-4 transition-all duration-200 ${getInsightColors(
                insight.type
              )}`}
            >
              {/* Top Section */}
              <div className='flex items-start gap-3 mb-2'>
                <div className='w-8 h-8 rounded-lg flex items-center justify-center bg-white/20 dark:bg-gray-600/20'>
                  <span className='text-lg'>{getInsightIcon(insight.type)}</span>
                </div>

                <div className='flex-1'>
                  <h4 className='font-bold text-gray-900 dark:text-gray-100 text-sm'>
                    {insight.title}
                  </h4>

                  {/* PRELIM BADGE */}
                  {insight.confidence && insight.confidence < 0.8 && (
                    <span className='inline-block mt-1 px-2 py-0.5 bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-200 rounded-full text-xs'>
                      Preliminary
                    </span>
                  )}
                </div>
              </div>

              {/* MESSAGE */}
              <p className='text-gray-700 dark:text-gray-300 text-xs mb-3'>
                {insight.message}
              </p>

              {/* CTA BUTTON */}
              {insight.action && (
                <button
                  onClick={() => handleActionClick(insight)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${getButtonColors(
                    insight.type
                  )} transition`}
                >
                  {insight.action}
                  {currentAnswer?.isLoading ? (
                    <div className='w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin'></div>
                  ) : (
                    <span>→</span>
                  )}
                </button>
              )}

              {/* AI Answer */}
              {currentAnswer && (
                <div className='mt-3 p-3 bg-white/70 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600'>
                  <p className='text-xs text-gray-800 dark:text-gray-200'>
                    {currentAnswer.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER BAR */}
      <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
          <div className='w-6 h-6 bg-[#D7F6FF]/50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
            🧠
          </div>
          Powered by AI analysis
        </div>

        <button
          onClick={loadInsights}
          className='px-4 py-1.5 bg-gradient-to-r from-[#00AEEF] via-[#0096D1] to-[#007EAA] text-white rounded-lg text-xs shadow-lg hover:shadow-xl transition'
        >
          Refresh Insights →
        </button>
      </div>
    </div>
  );
};

export default AIInsights;
