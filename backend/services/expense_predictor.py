import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import io
import base64
from typing import Dict, List, Tuple, Optional
from sklearn.linear_model import LinearRegression

class ExpensePredictor:
    def __init__(self):
        self.model = LinearRegression()
        self.is_trained = False
        self.months_data = []
        self.expenses_data = []

    def train(self, months_index: List[int], expenses: List[float]) -> Dict:
        if len(months_index) < 2 or len(expenses) < 2:
            return {
                'success': False,
                'error': 'Insufficient data for training. Need at least 2 months of data.'
            }

        self.months_data = months_index
        self.expenses_data = expenses

        X = np.array(months_index).reshape(-1, 1)
        y = np.array(expenses)

        self.model.fit(X, y)
        self.is_trained = True

        predictions = self.model.predict(X)
        score = self.model.score(X, y)

        return {
            'success': True,
            'score': score,
            'coefficient': float(self.model.coef_[0]),
            'intercept': float(self.model.intercept_)
        }

    def predict_next_month(self) -> Optional[float]:
        if not self.is_trained:
            return None

        next_month_index = np.array([[self.months_data[-1] + 1]])
        prediction = self.model.predict(next_month_index)[0]
        return max(0, prediction)

    def predict_category_next_month(self, months_index: List[int], expenses: List[float]) -> Optional[float]:
        if len(months_index) < 2 or len(expenses) < 2:
            return None

        X = np.array(months_index).reshape(-1, 1)
        y = np.array(expenses)

        model = LinearRegression()
        model.fit(X, y)

        next_month_index = np.array([[months_index[-1] + 1]])
        prediction = model.predict(next_month_index)[0]
        return max(0, prediction)

    def get_predictions_vs_actual(self) -> List[Dict]:
        if not self.is_trained:
            return []

        X = np.array(self.months_data).reshape(-1, 1)
        predictions = self.model.predict(X)

        result = []
        for i, (month_idx, actual, predicted) in enumerate(zip(self.months_data, self.expenses_data, predictions)):
            result.append({
                'month_index': int(month_idx),
                'actual': float(actual),
                'predicted': float(predicted)
            })

        return result

    def create_prediction_chart(self, months: List[str], actual_expenses: List[float], 
                                 predicted_next: float, next_month_label: str) -> Optional[str]:
        if not self.is_trained or len(months) < 1:
            return None

        all_months = months + [next_month_label]
        predicted_expenses = list(self.get_predictions_vs_actual())

        predicted_values = [p['predicted'] for p in predicted_expenses]

        all_predicted = predicted_values + [predicted_next]

        plt.figure(figsize=(10, 6))

        x_range = range(len(all_months))
        plt.plot(x_range[:len(actual_expenses)], actual_expenses, 'b-o', label='Actual Expenses', linewidth=2, markersize=8)
        plt.plot(x_range, all_predicted, 'r--s', label='Predicted', linewidth=2, markersize=8)

        plt.axvline(x=len(months) - 0.5, color='gray', linestyle=':', alpha=0.7)

        plt.xticks(x_range, all_months, rotation=45, ha='right')

        plt.xlabel('Month', fontsize=12)
        plt.ylabel('Expense Amount', fontsize=12)
        plt.title('Monthly Expense: Actual vs Predicted', fontsize=14, fontweight='bold')
        plt.legend(loc='upper left')
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        plt.close()

        return image_base64

    def create_category_prediction_chart(self, category_data: Dict[str, Tuple[List[str], List[float], Optional[float]]]) -> Optional[str]:
        if not category_data:
            return None

        plt.figure(figsize=(12, 7))

        colors = plt.cm.tab10.colors

        for idx, (category, data) in enumerate(category_data.items()):
            months, expenses, next_pred = data
            if not months:
                continue

            color = colors[idx % len(colors)]

            if len(months) > 1 and next_pred is not None:
                all_months = months + [months[-1][:7] + '_next']
                all_values = list(expenses) + [next_pred]
                plt.plot(range(len(all_months)), all_values, '-o', label=category, color=color, linewidth=2, markersize=8)
            else:
                plt.plot(range(len(months)), list(expenses), '-o', label=category, color=color, linewidth=2, markersize=8)

        plt.xlabel('Month', fontsize=12)
        plt.ylabel('Expense Amount', fontsize=12)
        plt.title('Category-wise Expense Predictions', fontsize=14, fontweight='bold')
        plt.legend(loc='upper left', bbox_to_anchor=(1.02, 1))
        plt.grid(True, alpha=0.3)
        plt.tight_layout()

        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode('utf-8')
        plt.close()

        return image_base64
