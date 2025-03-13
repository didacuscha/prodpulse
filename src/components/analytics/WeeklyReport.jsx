import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../shared/Card';

const COLORS = ['#606c38', '#283618', '#dda15e', '#bc6c25'];

const WeeklyReport = ({ activities, calculateDuration, getChartData }) => {
  const weeklyData = activities
    .filter(activity => {
      const activityDate = new Date(activity.date);
      const today = new Date();
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      return activityDate >= weekAgo;
    })
    .reduce((acc, activity) => {
      const day = new Date(activity.date).toLocaleDateString('en-US', { weekday: 'short' });
      const duration = calculateDuration(activity);
      
      if (!acc[day]) {
        acc[day] = { name: day, hours: 0 };
      }
      acc[day].hours += duration;
      return acc;
    }, {});

  const weeklyChartData = Object.values(weeklyData);
  const { tagData } = getChartData();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#283618]">Weekly Report</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-4">Hours by Day</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)} hrs`, 'Duration']}
                />
                <Bar dataKey="hours" fill="#606c38" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-4">Weekly Tag Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tagData}
                  dataKey="hours"
                  nameKey="tag"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {tagData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)} hrs`, 'Duration']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyReport; 