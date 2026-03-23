import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CreateTask = ({ user, projects, token }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assigned_to: '',
    estimated_hours: ''
  });

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      project_id: parseInt(formData.project_id),
      due_date: formatDate(formData.due_date),
      assigned_to: formData.assigned_to ? parseInt(formData.assigned_to) : null,
      estimated_hours: formData.estimated_hours ? parseFloat(formData.estimated_hours) : null
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Task created successfully!');
        history.push('/tasks');
      } else {
        alert('Error: ' + (data.error || 'Failed to create task'));
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Create task error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-2xl font-bold text-blue-600">
              <i className="fas fa-tasks mr-2"></i>TaskFlow
            </a>
            <nav className="flex space-x-4 ml-8">
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a>
              <a href="/projects" className="text-gray-600 hover:text-blue-600">Projects</a>
              <a href="/tasks" className="text-blue-600 font-semibold">Tasks</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, <strong>{user.username}</strong></span>
            <a href="/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <a href="/tasks" className="text-blue-600 hover:underline">
            <i className="fas fa-arrow-left mr-2"></i>Back to Tasks
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Task</h2>
          <p className="text-gray-600 mb-6">Fill in the details to create a new task</p>

          <form id="create-task-form" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input type="text" id="title" name="title" required
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter task title"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea id="description" name="description" rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
            </div>

            <div>
              <label htmlFor="project_id" className="block text-sm font-medium text-gray-700 mb-2">
                Project <span className="text-red-500">*</span>
              </label>
              <select id="project_id" name="project_id" required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.project_id}
                      onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}>
                <option value="">Select a project</option>
                {projects && projects.map((project) => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select id="status" name="status"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="testing">Testing</option>
                  <option value="done">Done</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select id="priority" name="priority"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input type="date" id="due_date" name="due_date"
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       value={formData.due_date}
                       onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} />
              </div>
            </div>

            <div>
              <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700 mb-2">
                Assign To
              </label>
              <select id="assigned_to" name="assigned_to"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.assigned_to}
                      onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}>
                <option value="">Unassigned</option>
                <option value={user.id}>{user.username} (Me)</option>
              </select>
            </div>

            <div>
              <label htmlFor="estimated_hours" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Hours
              </label>
              <input type="number" id="estimated_hours" name="estimated_hours" step="0.5"
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter estimated hours"
                     value={formData.estimated_hours}
                     onChange={(e) => setFormData({ ...formData, estimated_hours: e.target.value })} />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <a href="/tasks" className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </a>
              <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg">
                <i className="fas fa-plus mr-2"></i>Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
