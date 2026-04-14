'use server';
import { ExpensePrediction } from '@/types/ExpensePrediction';

const API_BASE_URL = process.env.NEXT_PUBLIC_PREDICTION_API_URL || 'http://localhost:5001';

export async function getExpensePrediction(clerkUserId: string): Promise<{
  prediction?: ExpensePrediction;
  error?: string;
}> {
  console.log('[PredictionAction] Starting prediction for user:', clerkUserId);
  try {
    const apiUrl = `${API_BASE_URL}/api/predict/${clerkUserId}`;
    console.log('[PredictionAction] Calling Flask API at:', apiUrl);
    
    // Add a timeout to the fetch to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[PredictionAction] API returned error:', response.status, errorText);
      try {
        const errorData = JSON.parse(errorText);
        return { error: errorData.error || 'Failed to fetch prediction' };
      } catch {
        return { error: `API Error: ${response.status}` };
      }
    }

    const data = await response.json();
    console.log('[PredictionAction] API returned data successfully');

    if (!data.success) {
      console.warn('[PredictionAction] API success=false:', data.error);
      return { error: data.error || 'Prediction failed' };
    }

    const prediction: ExpensePrediction = {
      nextMonth: data.prediction.next_month,
      previousMonth: data.prediction.previous_month,
      changePercentage: data.prediction.change_percentage,
      changeDirection: data.prediction.change_direction,
      categoryPredictions: data.category_predictions || {},
      chartImage: data.chart_image,
      modelScore: data.model_info.score,
      dataSummary: {
        totalRecords: data.data_summary.total_records,
        monthsAnalyzed: data.data_summary.months_analyzed,
        dateRange: {
          start: data.data_summary.date_range.start,
          end: data.data_summary.date_range.end,
        },
      },
    };

    return { prediction };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('[PredictionAction] API request timed out');
      return { error: 'Prediction service timed out. Please try again later.' };
    }
    console.error('[PredictionAction] Error fetching expense prediction:', error);
    return { error: 'Unable to connect to prediction service. Please ensure the backend is running.' };
  }
}
