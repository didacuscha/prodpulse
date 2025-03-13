import React from 'react';
import ActivityItem from './ActivityItem';
import Card from '../shared/Card';

const Activities = ({ activities, calculateDuration }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#283618] tracking-wide">Activity Log</h2>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#DDA15E]">
            <thead className="bg-[#FAEDCD]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#606C38] uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FEFAE0] divide-y divide-[#DDA15E]">
              {activities.map(activity => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity}
                  calculateDuration={calculateDuration}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Activities; 