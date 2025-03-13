import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import useActivities from './hooks/useActivities';

// Import tab components (to be created)
import Dashboard from './components/dashboard/Dashboard';
import Activities from './components/activities/Activities';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const activitiesHook = useActivities();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard {...activitiesHook} />;
      case 'activities':
        return <Activities {...activitiesHook} />;
      case 'analytics':
        return <Analytics {...activitiesHook} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard {...activitiesHook} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveTab()}
    </Layout>
  );
};

export default App;

