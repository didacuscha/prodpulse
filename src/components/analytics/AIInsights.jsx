import React from 'react';
import { Brain, TrendingUp, Clock, Tag } from 'lucide-react';
import Card from '../shared/Card';

const InsightCard = ({ icon: Icon, title, description }) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-[#606c38]/10 rounded-lg">
        <Icon className="w-5 h-5 text-[#606c38]" />
      </div>
      <div>
        <h3 className="font-medium text-[#283618] mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </Card>
);

const AIInsights = () => {
  const insights = [
    {
      icon: Clock,
      title: "Peak Productivity Hours",
      description: "Your most productive hours are between 9 AM and 11 AM. Consider scheduling important tasks during this time."
    },
    {
      icon: TrendingUp,
      title: "Activity Patterns",
      description: "You tend to complete more tasks on Tuesdays and Wednesdays. Plan your week accordingly for optimal productivity."
    },
    {
      icon: Tag,
      title: "Focus Areas",
      description: "Development tasks take up 40% of your time, followed by meetings at 25%. Consider if this aligns with your goals."
    },
    {
      icon: Brain,
      title: "Suggested Improvements",
      description: "Taking more breaks between long coding sessions could help maintain consistent productivity levels."
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#283618]">AI-Generated Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>
    </div>
  );
};

export default AIInsights; 