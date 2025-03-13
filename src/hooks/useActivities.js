import { useState } from 'react';

const useActivities = () => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'Project Planning', timeframe: 'Morning', startTime: '09:00', endTime: '10:30', date: '2025-03-11', tags: ['Work', 'Planning'], priority: 'High', notes: 'Quarterly planning session' },
    { id: 2, name: 'Team Meeting', timeframe: 'Morning', startTime: '11:00', endTime: '12:00', date: '2025-03-11', tags: ['Work', 'Meeting'], priority: 'Medium', notes: 'Weekly sync' },
    { id: 3, name: 'Lunch Break', timeframe: 'Afternoon', startTime: '12:00', endTime: '13:00', date: '2025-03-11', tags: ['Break'], priority: 'Low', notes: '' },
    // ... more initial activities
  ]);

  const [newActivity, setNewActivity] = useState({
    name: '',
    timeframe: 'Morning',
    startTime: '',
    endTime: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    priority: 'Medium',
    notes: ''
  });

  // Calculate duration in hours
  const calculateDuration = (start, end) => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    return ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60;
  };

  // Add new activity
  const addActivity = (activity) => {
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    setActivities([...activities, { ...activity, id: newId }]);
  };

  // Reset new activity form
  const resetNewActivity = () => {
    setNewActivity({
      name: '',
      timeframe: 'Morning',
      startTime: '',
      endTime: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      priority: 'Medium',
      notes: ''
    });
  };

  // Process data for charts
  const getChartData = () => {
    const timeframeData = [
      { name: 'Morning', hours: 0 },
      { name: 'Afternoon', hours: 0 },
      { name: 'Evening', hours: 0 },
    ];

    const tagData = [];
    const tagCounts = {};

    activities.forEach(activity => {
      // Calculate hours for timeframe chart
      const duration = calculateDuration(activity.startTime, activity.endTime);
      const timeframeItem = timeframeData.find(item => item.name === activity.timeframe);
      if (timeframeItem) timeframeItem.hours += duration;
      
      // Calculate for tag chart
      activity.tags.forEach(tag => {
        if (!tagCounts[tag]) tagCounts[tag] = 0;
        tagCounts[tag] += duration;
      });
    });

    // Convert tag counts to chart data
    Object.keys(tagCounts).forEach(tag => {
      tagData.push({ name: tag, value: tagCounts[tag] });
    });

    return { timeframeData, tagData };
  };

  return {
    activities,
    newActivity,
    setNewActivity,
    addActivity,
    resetNewActivity,
    calculateDuration,
    getChartData
  };
};

export default useActivities; 