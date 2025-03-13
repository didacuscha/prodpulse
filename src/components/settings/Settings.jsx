import React from 'react';
import UserPreferences from './UserPreferences';
import NotificationSettings from './NotificationSettings';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#283618] tracking-wide">Settings</h2>
      <UserPreferences />
      <NotificationSettings />
    </div>
  );
};

export default Settings; 