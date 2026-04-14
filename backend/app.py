import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from services import DataPreparation, ExpensePredictor
import psycopg2
from dotenv import load_dotenv
import base64

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'expense_tracker'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', ''),
        port=os.getenv('DB_PORT', '5432')
    )
    return conn

def get_user_records_by_clerk_id(clerk_user_id: str):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT r.id, r.text, r.amount, r.category, r.date
            FROM "Record" r
            JOIN "User" u ON r."userId" = u."clerkUserId"
            WHERE u."clerkUserId" = %s
            ORDER BY r.date DESC
        """, (clerk_user_id,))
        records = cur.fetchall()
        cur.close()
        conn.close()

        if not records:
            return get_mock_records()

        return [
            {
                'id': r[0],
                'text': r[1],
                'amount': float(r[2]),
                'category': r[3],
                'date': r[4].isoformat() if hasattr(r[4], 'isoformat') else str(r[4])
            }
            for r in records
        ]
    except Exception as e:
        print(f"Database error: {e}. Falling back to mock data.")
        return get_mock_records()

def get_mock_records():
    """Generates mock data for demonstration purposes if DB is unavailable."""
    from datetime import datetime, timedelta
    import random
    
    categories = ['Food', 'Transport', 'Rent', 'Shopping', 'Entertainment', 'Health']
    mock_records = []
    
    # Generate data for the last 6 months
    now = datetime.now()
    for i in range(180): # 180 days
        date = now - timedelta(days=i)
        # Add 1-3 expenses per day
        for _ in range(random.randint(1, 3)):
            mock_records.append({
                'id': f'mock-{i}-{_}',
                'text': f'Mock expense {i}',
                'amount': random.uniform(50, 2000),
                'category': random.choice(categories),
                'date': date.isoformat()
            })
    return mock_records

@app.route('/api/predict/<clerk_user_id>', methods=['GET'])
def predict_expense(clerk_user_id):
    try:
        records = get_user_records_by_clerk_id(clerk_user_id)

        if len(records) < 2:
            return jsonify({
                'success': False,
                'error': 'Insufficient data for prediction. Need at least 2 months of expense records.',
                'records_count': len(records)
            }), 400

        data_prep = DataPreparation(records)
        data_prep.prepare_data()

        monthly_data = data_prep.aggregate_monthly()

        if len(monthly_data) < 2:
            return jsonify({
                'success': False,
                'error': 'Insufficient monthly data for prediction.',
                'months_count': len(monthly_data)
            }), 400

        predictor = ExpensePredictor()

        training_result = predictor.train(
            monthly_data['month_index'].tolist(),
            monthly_data['total_expense'].tolist()
        )

        if not training_result['success']:
            return jsonify(training_result), 400

        predicted_next = predictor.predict_next_month()
        previous_month = data_prep.get_previous_month_expense()

        predictions_vs_actual = predictor.get_predictions_vs_actual()

        months_list, expenses_list = data_prep.get_monthly_data_for_viz()

        chart_image = None
        if len(months_list) >= 2:
            next_month_label = 'Next Month (Predicted)'
            chart_image = predictor.create_prediction_chart(
                months_list,
                expenses_list,
                predicted_next,
                next_month_label
            )

        change_percentage = None
        if previous_month and previous_month > 0:
            change_percentage = ((predicted_next - previous_month) / previous_month) * 100

        category_predictions = {}
        category_monthly = data_prep.aggregate_category_monthly()

        for category, cat_monthly in category_monthly.items():
            if len(cat_monthly) >= 2:
                cat_pred = predictor.predict_category_next_month(
                    cat_monthly['month_index'].tolist(),
                    cat_monthly['total_expense'].tolist()
                )
                if cat_pred is not None:
                    category_predictions[category] = {
                        'predicted': round(cat_pred, 2),
                        'previous': float(cat_monthly.iloc[-1]['total_expense'])
                    }

        return jsonify({
            'success': True,
            'prediction': {
                'next_month': round(predicted_next, 2),
                'previous_month': round(previous_month, 2) if previous_month else None,
                'change_percentage': round(change_percentage, 2) if change_percentage else None,
                'change_direction': 'increase' if change_percentage and change_percentage > 0 else 'decrease'
            },
            'model_info': {
                'score': round(training_result['score'], 4),
                'coefficient': round(training_result['coefficient'], 2),
                'intercept': round(training_result['intercept'], 2)
            },
            'category_predictions': category_predictions,
            'chart_image': chart_image,
            'data_summary': {
                'total_records': len(records),
                'months_analyzed': len(monthly_data),
                'date_range': {
                    'start': months_list[0] if months_list else None,
                    'end': months_list[-1] if months_list else None
                }
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'expense-predictor'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
