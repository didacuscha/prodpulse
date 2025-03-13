import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../shared/Card';

const ActivityChart = ({ data }) => {
  return (
    <Card>
      <h3 className="text-lg font-medium text-[#283618] mb-4">Hours by Timeframe</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDA15E" opacity={0.2} />
            <XAxis dataKey="name" stroke="#606C38" />
            <YAxis stroke="#606C38" label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#606C38' }} />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(2)} hrs`, 'Hours']}
              contentStyle={{
                backgroundColor: '#FEFAE0',
                border: '1px solid #DDA15E',
              }}
            />
            <Bar dataKey="hours" fill="#D4A373" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ActivityChart; 