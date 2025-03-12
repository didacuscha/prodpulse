import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Clock, BarChart2, PieChart as PieChartIcon, List, Settings } from 'lucide-react';

const ProductivityDashboard = () => {
  // Sample data - in a real app this would come from a database/API
  const [activities, setActivities] = useState([
    { id: 1, name: 'Project Planning', timeframe: 'Morning', startTime: '09:00', endTime: '10:30', date: '2025-03-11', tags: ['Work', 'Planning'], priority: 'High', notes: 'Quarterly planning session' },
    { id: 2, name: 'Team Meeting', timeframe: 'Morning', startTime: '11:00', endTime: '12:00', date: '2025-03-11', tags: ['Work', 'Meeting'], priority: 'Medium', notes: 'Weekly sync' },
    { id: 3, name: 'Lunch Break', timeframe: 'Afternoon', startTime: '12:00', endTime: '13:00', date: '2025-03-11', tags: ['Break'], priority: 'Low', notes: '' },
    { id: 4, name: 'Code Review', timeframe: 'Afternoon', startTime: '13:30', endTime: '15:30', date: '2025-03-11', tags: ['Work', 'Development'], priority: 'High', notes: 'Review pull requests' },
    { id: 5, name: 'Client Call', timeframe: 'Afternoon', startTime: '16:00', endTime: '16:30', date: '2025-03-11', tags: ['Work', 'Meeting'], priority: 'High', notes: 'Discuss project timeline' },
    { id: 6, name: 'Exercise', timeframe: 'Evening', startTime: '18:00', endTime: '19:00', date: '2025-03-11', tags: ['Personal', 'Health'], priority: 'Medium', notes: 'Cardio session' },
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

  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Helper to calculate duration in hours
  const calculateDuration = (start, end) => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    return ((endHour * 60 + endMin) - (startHour * 60 + startMin)) / 60;
  };

  // Process data for charts
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

  const COLORS = ['#D4A373', '#BC6C25', '#606C38', '#283618', '#DDA15E', '#FEFAE0'];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  // Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setNewActivity({
        ...newActivity,
        tags: [...newActivity.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setNewActivity({
      ...newActivity,
      tags: newActivity.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    setActivities([...activities, { ...newActivity, id: newId }]);
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

  return (
    <div className="flex flex-col min-h-screen bg-[#FAEDCD]">
      {/* Header */}
      <header className="bg-[#FEFAE0] shadow-sm py-6 border-b border-[#DDA15E] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-[#283618] tracking-wide">Prodpulse</h1>
            <div className="flex items-center space-x-4">
              <span className="text-[#606C38]">Welcome back, User</span>
              <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center text-[#FEFAE0] font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex justify-center w-full">
        <div className="max-w-7xl w-full flex">
          {/* Sidebar */}
          <aside className="w-16 md:w-64 bg-[#FEFAE0] border-r border-[#DDA15E] py-8 flex-shrink-0">
            <nav className="flex flex-col items-center md:items-start px-4 space-y-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-[#D4A373] text-[#FEFAE0]' 
                    : 'text-[#606C38] hover:bg-[#FAEDCD]'
                }`}
              >
                <BarChart2 size={20} />
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveTab('activities')}
                className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'activities' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <List size={20} />
                <span className="hidden md:inline">Activities</span>
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <PieChartIcon size={20} />
                <span className="hidden md:inline">Analytics</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-3 w-full p-2 rounded-lg ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Settings size={20} />
                <span className="hidden md:inline">Settings</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 py-8 px-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-medium text-[#283618] tracking-wide">Today's Overview</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="jp-card p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-[#283618]">Activities</h3>
                        <Calendar size={20} className="text-[#D4A373]" />
                      </div>
                      <p className="text-3xl font-medium mt-4 text-[#283618]">{activities.length}</p>
                      <p className="text-sm text-[#606C38] mt-1">Logged Today</p>
                    </div>
                    
                    <div className="jp-card p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-[#283618]">Total Hours</h3>
                        <Clock size={20} className="text-indigo-500" />
                      </div>
                      <p className="text-3xl font-bold mt-4">
                        {activities.reduce((total, activity) => 
                          total + calculateDuration(activity.startTime, activity.endTime), 0).toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Tracked Today</p>
                    </div>
                    
                    <div className="jp-card p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-[#283618]">Productivity Score</h3>
                        <BarChart2 size={20} className="text-indigo-500" />
                      </div>
                      <p className="text-3xl font-bold mt-4">85%</p>
                      <p className="text-sm text-gray-500 mt-1">Based on your goals</p>
                    </div>
                  </div>
                  
                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="jp-card p-6">
                      <h3 className="text-lg font-medium text-[#283618] mb-4">Hours by Timeframe</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timeframeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => [`${value.toFixed(2)} hrs`, 'Hours']} />
                            <Bar dataKey="hours" fill="#6366F1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="jp-card p-6">
                      <h3 className="text-lg font-medium text-[#283618] mb-4">Hours by Tag</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={tagData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {tagData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value.toFixed(2)} hrs`, 'Hours']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  {/* Log Activity Card */}
                  <div className="jp-card p-6 mt-8">
                    <h3 className="text-lg font-medium text-[#283618] mb-4">Log New Activity</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={newActivity.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timeframe
                          </label>
                          <select
                            name="timeframe"
                            value={newActivity.timeframe}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={newActivity.date}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Time
                          </label>
                          <input
                            type="time"
                            name="startTime"
                            value={newActivity.startTime}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Time
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            value={newActivity.endTime}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            name="priority"
                            value={newActivity.priority}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags (press Enter to add)
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 p-1">
                            <div className="flex flex-wrap gap-1 mr-2">
                              {newActivity.tags.map(tag => (
                                <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center">
                                  {tag}
                                  <button 
                                    type="button" 
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                              className="flex-1 p-1 outline-none"
                              placeholder="Add tags..."
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                          </label>
                          <textarea
                            name="notes"
                            value={newActivity.notes}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="jp-button"
                        >
                          Log Activity
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Activity Log</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tags
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activities.map(activity => (
                          <tr key={activity.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                              {activity.notes && (
                                <div className="text-sm text-gray-500">{activity.notes}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{activity.date}</div>
                              <div className="text-sm text-gray-500">
                                {activity.startTime} - {activity.endTime}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {calculateDuration(activity.startTime, activity.endTime).toFixed(1)} hrs
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-wrap gap-1">
                                {activity.tags.map(tag => (
                                  <span 
                                    key={tag} 
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  activity.priority === 'High' 
                                    ? 'bg-red-100 text-red-800' 
                                    : activity.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {activity.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Analytics & Insights</h2>
                  
                  {/* AI Insights Box */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-indigo-700 mb-2">AI Productivity Insights</h3>
                    <p className="text-indigo-600 mb-4">Here's what our AI analysis discovered about your productivity patterns:</p>
                    
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <h4 className="font-medium text-gray-800">You're most productive in the mornings</h4>
                        <p className="text-gray-600 text-sm mt-1">Your high-priority tasks show better completion rates when scheduled before noon.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <h4 className="font-medium text-gray-800">Consider more breaks between meetings</h4>
                        <p className="text-gray-600 text-sm mt-1">We noticed your productivity decreases after consecutive meetings without breaks.</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <h4 className="font-medium text-gray-800">Weekly planning boosts efficiency</h4>
                        <p className="text-gray-600 text-sm mt-1">Weeks that start with planning sessions show 23% higher task completion rates.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Weekly Report Preview */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-700">Weekly Report Preview</h3>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Full Report
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Hours by Category</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Work', value: 32 },
                                  { name: 'Personal', value: 14 },
                                  { name: 'Health', value: 5 },
                                  { name: 'Learning', value: 8 },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {COLORS.map((color, index) => (
                                  <Cell key={`cell-${index}`} fill={color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value} hrs`, 'Hours']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Daily Productivity Score</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={[
                                { day: 'Mon', score: 78 },
                                { day: 'Tue', score: 82 },
                                { day: 'Wed', score: 75 },
                                { day: 'Thu', score: 88 },
                                { day: 'Fri', score: 90 },
                                { day: 'Sat', score: 65 },
                                { day: 'Sun', score: 60 },
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                              <Bar dataKey="score" fill="#6366F1" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Weekly Achievements</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Completed 37 activities (↑12% from last week)
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Improved focus time by 18% during morning sessions
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Maintained consistent exercise habit (5 days this week)
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          Meeting time increased by 23% (potential area for optimization)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">User Preferences</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Default Time Zone
                        </label>
                        <select className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                          <option>Eastern Time (ET)</option>
                          <option>Pacific Time (PT)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>UTC</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notification Settings
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="emailNotifications" className="mr-2" />
                            <label htmlFor="emailNotifications" className="text-sm text-gray-700">Email Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="smsNotifications" className="mr-2" />
                            <label htmlFor="smsNotifications" className="text-sm text-gray-700">SMS Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="pushNotifications" className="mr-2" />
                            <label htmlFor="pushNotifications" className="text-sm text-gray-700">Push Notifications</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductivityDashboard;

