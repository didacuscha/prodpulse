import React from 'react';
import AIInsights from './AIInsights';
import WeeklyReport from './WeeklyReport';

const Analytics = ({ activities, calculateDuration, getChartData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#283618] tracking-wide">Analytics & Insights</h2>
      <AIInsights />
      <WeeklyReport activities={activities} calculateDuration={calculateDuration} getChartData={getChartData} />
    </div>
  );
};

export default Analytics; 