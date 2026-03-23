import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import NotificationsDropdown from './NotificationsDropdown';
import { API, NotificationManager } from '../utils';

const App = ({ user, activePage, flash, content }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await API.get('/api/notifications');
      if (response.success && response.data) {
        setNotificationCount(response.data.unread_count || 0);
        setNotifications(response.data.notifications || []);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {user ? (
        <>
          <Sidebar user={user} activePage={activePage} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header notificationCount={notificationCount} />
            <MainContent flash={flash} content={content} />
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          {content}
        </div>
      )}
      <NotificationsDropdown notifications={notifications} />
    </div>
  );
};

export default App;
