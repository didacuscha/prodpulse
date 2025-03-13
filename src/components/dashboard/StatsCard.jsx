import React from 'react';
import Card from '../shared/Card';

const StatsCard = ({ title, value, subtitle, icon }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#283618]">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-medium mt-4 text-[#283618]">{value}</p>
      <p className="text-sm text-[#606C38] mt-1">{subtitle}</p>
    </Card>
  );
};

export default StatsCard; 