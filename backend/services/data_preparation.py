import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, List, Tuple, Optional

class DataPreparation:
    def __init__(self, records: List[Dict]):
        self.records = records
        self.df = None

    def prepare_data(self) -> pd.DataFrame:
        if not self.records:
            return pd.DataFrame()

        df = pd.DataFrame(self.records)
        df['date'] = pd.to_datetime(df['date'])
        df['amount'] = pd.to_numeric(df['amount'], errors='coerce')
        df = df.dropna(subset=['date', 'amount'])
        df = df.sort_values('date')
        self.df = df
        return df

    def aggregate_monthly(self) -> pd.DataFrame:
        if self.df is None:
            self.prepare_data()

        if self.df.empty:
            return pd.DataFrame()

        self.df['month'] = self.df['date'].dt.to_period('M')
        monthly_expenses = self.df.groupby('month')['amount'].sum().reset_index()
        monthly_expenses.columns = ['month', 'total_expense']
        monthly_expenses['month'] = monthly_expenses['month'].astype(str)
        monthly_expenses['month_index'] = range(len(monthly_expenses))

        return monthly_expenses

    def aggregate_category_monthly(self) -> Dict[str, pd.DataFrame]:
        if self.df is None:
            self.prepare_data()

        if self.df.empty:
            return {}

        self.df['month'] = self.df['date'].dt.to_period('M')
        category_monthly = {}

        for category in self.df['category'].unique():
            cat_df = self.df[self.df['category'] == category]
            monthly = cat_df.groupby('month')['amount'].sum().reset_index()
            monthly.columns = ['month', 'total_expense']
            monthly['month'] = monthly['month'].astype(str)
            monthly['month_index'] = range(len(monthly))
            category_monthly[category] = monthly

        return category_monthly

    def get_previous_month_expense(self) -> Optional[float]:
        monthly = self.aggregate_monthly()
        if monthly.empty:
            return None
        return monthly.iloc[-1]['total_expense']

    def get_monthly_data_for_viz(self) -> Tuple[List[str], List[float]]:
        monthly = self.aggregate_monthly()
        if monthly.empty:
            return [], []
        return monthly['month'].tolist(), monthly['total_expense'].tolist()

    def get_category_data_for_viz(self) -> Dict[str, Tuple[List[str], List[float]]]:
        category_monthly = self.aggregate_category_monthly()
        result = {}
        for category, df in category_monthly.items():
            result[category] = (df['month'].tolist(), df['total_expense'].tolist())
        return result
