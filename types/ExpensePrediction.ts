export interface ExpensePrediction {
  nextMonth: number;
  previousMonth: number | null;
  changePercentage: number | null;
  changeDirection: 'increase' | 'decrease' | null;
  categoryPredictions: Record<string, {
    predicted: number;
    previous: number;
  }>;
  chartImage: string | null;
  modelScore: number;
  dataSummary: {
    totalRecords: number;
    monthsAnalyzed: number;
    dateRange: {
      start: string | null;
      end: string | null;
    };
  };
}
