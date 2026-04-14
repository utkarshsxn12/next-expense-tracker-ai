'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getExpensePrediction } from '@/app/actions/getExpensePrediction';
import { ExpensePrediction } from '@/types/ExpensePrediction';

const ExpenseForecast: React.FC = () => {
  const { user } = useUser();
  const [prediction, setPrediction] = useState<ExpensePrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { prediction: pred, error: err } = await getExpensePrediction(user.id);

      if (err) {
        setError(err);
        setPrediction(null);
      } else if (pred) {
        setPrediction(pred);
        setError(null);
      }

      setLoading(false);
    };

    fetchPrediction();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">🔮</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Expense Forecast
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI-powered predictions
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">🔮</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Expense Forecast
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI-powered predictions
            </p>
          </div>
        </div>
        <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
              <span className="text-sm">⚠️</span>
            </div>
            <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm">
              Prediction Unavailable
            </p>
          </div>
          <p className="text-amber-700 dark:text-amber-400 text-xs ml-8">{error}</p>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">🔮</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Expense Forecast
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              AI-powered predictions
            </p>
          </div>
        </div>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">📊</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
            No Prediction Available
          </h4>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed text-sm">
            Add more expense records to enable AI-powered forecasting.
          </p>
        </div>
      </div>
    );
  }

  const changeColor = prediction.changeDirection === 'increase' ? 'text-red-600' : 'text-green-600';
  const changeBg = prediction.changeDirection === 'increase' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20';
  const changeBorder = prediction.changeDirection === 'increase' ? 'border-l-red-500' : 'border-l-green-500';

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/40 dark:border-gray-700/40">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">🔮</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            Expense Forecast
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            AI-powered predictions
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-blue-900/30 rounded-xl p-4 border border-purple-200/40 dark:border-purple-700/40">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2 tracking-wide uppercase">
              Predicted Next Month
            </p>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              ₹{prediction.nextMonth.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {prediction.changePercentage !== null && (
              <div className={`inline-flex items-center gap-2 ${changeBg} px-3 py-1.5 rounded-full text-sm font-medium ${changeColor}`}>
                <span className="text-lg">{prediction.changeDirection === 'increase' ? '↑' : '↓'}</span>
                <span>{Math.abs(prediction.changePercentage).toFixed(1)}%</span>
                <span className="text-xs opacity-80">vs last month</span>
              </div>
            )}
          </div>
        </div>

        <div className={`${changeBg} backdrop-blur-sm p-3 sm:p-4 rounded-xl border-l-4 ${changeBorder}`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                {prediction.changeDirection === 'increase' ? 'Increase' : 'Decrease'} Expected
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Compared to ₹{prediction.previousMonth?.toLocaleString('en-IN') || 0} last month
              </p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${changeColor}`}>
                {prediction.changeDirection === 'increase' ? '+' : '-'}₹{Math.abs((prediction.nextMonth || 0) - (prediction.previousMonth || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {prediction.chartImage && (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-xs mb-2">
              Actual vs Predicted
            </h4>
            <img
              src={`data:image/png;base64,${prediction.chartImage}`}
              alt="Expense Prediction Chart"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {Object.keys(prediction.categoryPredictions).length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">
              Category-wise Predictions
            </h4>
            <div className="space-y-2">
              {Object.entries(prediction.categoryPredictions).map(([category, data]) => (
                <div key={category} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      ₹{data.predicted.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      (was ₹{data.previous.toLocaleString('en-IN', { minimumFractionDigits: 0 })})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
          <p className="font-medium mb-1">Model Confidence</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(prediction.modelScore) * 100}%` }}
              ></div>
            </div>
            <span className="font-semibold">{(prediction.modelScore * 100).toFixed(0)}%</span>
          </div>
          <p className="mt-1 opacity-70">{prediction.dataSummary.monthsAnalyzed} months analyzed</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForecast;
