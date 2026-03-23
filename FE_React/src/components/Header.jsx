import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ notificationCount }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              id="global-search"
              placeholder="Search tasks, projects, users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-primary" id="notifications-btn">
            <i className="fas fa-bell text-xl"></i>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          <Link to="/tasks/new" className="btn bg-primary text-white px-4 py-2 rounded-lg">
            <i className="fas fa-plus mr-2"></i>New Task
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
