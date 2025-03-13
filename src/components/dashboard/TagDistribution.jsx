import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../shared/Card';

const TagDistribution = ({ data, colors }) => {
  return (
    <Card>
      <h3 className="text-lg font-medium text-[#283618] mb-4">Hours by Tag</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value.toFixed(2)} hrs`, 'Hours']}
              contentStyle={{
                backgroundColor: '#FEFAE0',
                border: '1px solid #DDA15E',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TagDistribution;
