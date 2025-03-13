import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Clock } from 'lucide-react';
import Card from '../shared/Card';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      dailySummary: true,
      weeklyReport: true,
      activityReminders: false,
    },
    push: {
      activityDue: true,
      goalAchieved: true,
      productivityTips: false,
    },
    inApp: {
      systemUpdates: true,
      newFeatures: true,
      teamActivity: true,
    }
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const NotificationSection = ({ title, icon: Icon, category, options }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#283618]">
        <Icon size={20} />
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(options).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm text-[#606C38]">
              {key.split(/(?=[A-Z])/).join(' ')}
            </label>
            <button
              type="button"
              onClick={() => handleToggle(category, key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-[#606C38]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <h3 className="text-lg font-medium text-[#283618] mb-6">Notification Settings</h3>
      <div className="space-y-8">
        <NotificationSection
          title="Email Notifications"
          icon={Mail}
          category="email"
          options={settings.email}
        />
        
        <NotificationSection
          title="Push Notifications"
          icon={Bell}
          category="push"
          options={settings.push}
        />
        
        <NotificationSection
          title="In-App Notifications"
          icon={MessageSquare}
          category="inApp"
          options={settings.inApp}
        />

        <div className="border-t border-[#DDA15E] pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#283618]" />
              <span className="text-sm text-[#606C38]">Quiet Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0] text-sm"
                defaultValue="22:00"
              >
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
              <span className="text-sm text-[#606C38]">to</span>
              <select
                className="p-2 border border-[#DDA15E] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373] bg-[#FEFAE0] text-sm"
                defaultValue="07:00"
              >
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="jp-button"
            onClick={() => console.log('Saving notification settings:', settings)}
          >
            Save Settings
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings; 