import React, { useState } from 'react';
import Card from '../shared/Card';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    timezone: 'America/New_York',
    theme: 'light',
    language: 'en',
    weekStartDay: 'monday'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the preferences to your backend
    console.log('Saving preferences:', preferences);
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-[#283618] mb-6">User Preferences</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Time Zone
            </label>
            <select
              name="timezone"
              value={preferences.timezone}
              onChange={handleChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Theme
            </label>
            <select
              name="theme"
              value={preferences.theme}
              onChange={handleChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Language
            </label>
            <select
              name="language"
              value={preferences.language}
              onChange={handleChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#606C38] mb-1">
              Week Starts On
            </label>
            <select
              name="weekStartDay"
              value={preferences.weekStartDay}
              onChange={handleChange}
              className="w-full p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0]"
            >
              <option value="monday">Monday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="jp-button"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </Card>
  );
};

export default UserPreferences; 