import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, activePage, onLogout }) => {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">
          <i className="fas fa-tasks mr-2"></i>TaskFlow
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage your work efficiently</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <Link to="/dashboard" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'dashboard' ? 'active' : ''}`}>
          <i className="fas fa-home w-5"></i>
          <span className="ml-3">Dashboard</span>
        </Link>
        <Link to="/projects" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'projects' ? 'active' : ''}`}>
          <i className="fas fa-folder w-5"></i>
          <span className="ml-3">Projects</span>
        </Link>
        <Link to="/tasks" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'tasks' ? 'active' : ''}`}>
          <i className="fas fa-check-square w-5"></i>
          <span className="ml-3">Tasks</span>
        </Link>
        <Link to="/calendar" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'calendar' ? 'active' : ''}`}>
          <i className="fas fa-calendar w-5"></i>
          <span className="ml-3">Calendar</span>
        </Link>
        <Link to="/teams" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'teams' ? 'active' : ''}`}>
          <i className="fas fa-users w-5"></i>
          <span className="ml-3">Teams</span>
        </Link>
        <Link to="/reports" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'reports' ? 'active' : ''}`}>
          <i className="fas fa-chart-bar w-5"></i>
          <span className="ml-3">Reports</span>
        </Link>
        {user.role === 'admin' && (
          <div className="mt-4 pt-4 border-t">
            <p className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Admin</p>
            <Link to="/admin/users" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'users' ? 'active' : ''}`}>
              <i className="fas fa-user-cog w-5"></i>
              <span className="ml-3">Users</span>
            </Link>
            <Link to="/admin/analytics" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'analytics' ? 'active' : ''}`}>
              <i className="fas fa-analytics w-5"></i>
              <span className="ml-3">Analytics</span>
            </Link>
            <Link to="/admin/settings" className={`sidebar-link flex items-center px-6 py-3 text-gray-700 ${activePage === 'settings' ? 'active' : ''}`}>
              <i className="fas fa-cog w-5"></i>
              <span className="ml-3">Settings</span>
            </Link>
          </div>
        )}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-gray-700">{user.username}</p>
            <p className="text-xs text-gray-500">{user.role || 'User'}</p>
          </div>
          <button onClick={onLogout} className="text-gray-400 hover:text-red-500" title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
