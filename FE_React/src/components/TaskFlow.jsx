import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const TaskFlow = ({ title = 'Tasks - TaskFlow', user, tasks, todoCount = 0, inProgressCount = 0, doneCount = 0 }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              <i className="fas fa-tasks mr-2"></i>TaskFlow
            </Link>
            <nav className="flex space-x-4 ml-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              <Link to="/projects" className="text-gray-600 hover:text-blue-600">Projects</Link>
              <Link to="/tasks" className="text-blue-600 font-semibold">Tasks</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, <strong>{user.username}</strong></span>
            <Link to="/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
            <p className="text-gray-600 mt-1">Manage and track your tasks</p>
          </div>
          <Link to="/tasks/new" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg inline-block">
            <i className="fas fa-plus mr-2"></i>New Task
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">To Do</p>
                <p className="text-2xl font-bold text-blue-700">{todoCount}</p>
              </div>
              <i className="fas fa-clock text-blue-500 text-2xl"></i>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-700">{inProgressCount}</p>
              </div>
              <i className="fas fa-spinner text-yellow-500 text-2xl"></i>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Done</p>
                <p className="text-2xl font-bold text-green-700">{doneCount}</p>
              </div>
              <i className="fas fa-check-circle text-green-500 text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-md">
          {tasks && tasks.length > 0 ? (
            <div className="divide-y">
              {tasks.map((task, index) => (
                <div key={index} className={`flex items-center p-4 ${task.status === 'done' ? 'bg-gray-50' : 'hover:bg-gray-50'} transition`}>
                  <input type="checkbox" checked={task.status === 'done'} disabled={task.status === 'done'}
                    className={`w-5 h-5 text-blue-500 border-gray-300 rounded ${task.status === 'done' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold text-gray-800 ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      {task.priority === 'high' && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">High</span>}
                      {task.priority === 'medium' && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">Medium</span>}
                      {task.priority === 'low' && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Low</span>}
                    </div>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                      <span><i className="fas fa-folder mr-1 text-gray-400"></i>{task.project_name || 'No Project'}</span>
                      {task.due_date && <span><i className="fas fa-calendar mr-1 text-gray-400"></i>{task.due_date}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {task.status === 'todo' && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">To Do</span>}
                    {task.status === 'in_progress' && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">In Progress</span>}
                    {task.status === 'review' && <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Review</span>}
                    {task.status === 'testing' && <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">Testing</span>}
                    {task.status === 'done' && <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Done</span>}
                    {task.status !== 'todo' && task.status !== 'in_progress' && task.status !== 'review' && task.status !== 'testing' && task.status !== 'done' && <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>}
                    {task.assigned_to_name && (
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold" title={task.assigned_to_name}>
                        {task.assigned_to_name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="fas fa-tasks text-gray-300 text-6xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Tasks Found</h3>
              <p className="text-gray-600 mb-6">Create your first task to get started</p>
              <Link to="/tasks/new" className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg inline-block">
                <i className="fas fa-plus mr-2"></i>Create Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFlow;