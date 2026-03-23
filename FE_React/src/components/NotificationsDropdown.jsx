import React from 'react';

const NotificationsDropdown = ({ notifications }) => {
  return (
    <div id="notifications-dropdown" className="hidden fixed right-6 top-16 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No notifications</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <p className="text-sm font-medium text-gray-800">{notif.title}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.time_ago}</p>
            </div>
          ))
        )}
      </div>
      <div className="p-3 border-t text-center">
        <a href="/notifications" className="text-sm text-primary hover:underline">View all notifications</a>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
