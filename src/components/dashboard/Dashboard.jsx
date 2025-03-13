import React, { useState } from 'react';
import { Calendar, Clock, BarChart2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import ActivityChart from './ActivityChart';
import TagDistribution from './TagDistribution';
import NewActivity from './NewActivity';
import Card from '../shared/Card';

const COLORS = ['#D4A373', '#BC6C25', '#606C38', '#283618', '#DDA15E', '#FEFAE0'];

const Dashboard = ({ 
  activities, 
  newActivity, 
  setNewActivity, 
  addActivity, 
  resetNewActivity,
  calculateDuration,
  getChartData 
}) => {
  const [tagInput, setTagInput] = useState('');
  const { timeframeData, tagData } = getChartData();

  const totalHours = activities
    .reduce((total, activity) => total + calculateDuration(activity.startTime, activity.endTime), 0)
    .toFixed(1);

  return (
    <div className="w-full space-y-8 px-4">
      {/* Header Section */}
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl font-medium text-[#283618] mb-8">Today's Overview</h2>
        
        <Card>
          <div className="grid grid-cols-12">
            <div className="col-span-4 flex justify-center px-4 py-6 border-r border-[#DDA15E]">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-[#D4A373]" />
                <div className="text-left">
                  <p className="text-3xl font-semibold text-[#283618]">
                    {activities.length}
                  </p>
                  <p className="text-sm text-[#606C38]">Activities</p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex justify-center px-4 py-6 border-r border-[#DDA15E]">
              <div className="flex items-center gap-3">
                <Clock size={24} className="text-[#D4A373]" />
                <div className="text-left">
                  <p className="text-3xl font-semibold text-[#283618]">
                    {totalHours}
                  </p>
                  <p className="text-sm text-[#606C38]">Total Hours</p>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex justify-center px-4 py-6">
              <div className="flex items-center gap-3">
                <BarChart2 size={24} className="text-[#D4A373]" />
                <div className="text-left">
                  <p className="text-3xl font-semibold text-[#283618]">85%</p>
                  <p className="text-sm text-[#606C38]">Productivity</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityChart data={timeframeData} />
        <TagDistribution data={tagData} colors={COLORS} />
      </div>
      
      {/* Log Activity Form */}
      <div className="w-full">
        <NewActivity
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          tagInput={tagInput}
          setTagInput={setTagInput}
          onSubmit={(e) => {
            e.preventDefault();
            addActivity(newActivity);
            resetNewActivity();
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;