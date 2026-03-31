import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    project_id: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setTasks(data.tasks || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask)
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewTask({ title: '', description: '', status: 'pending', priority: 'medium', project_id: '' });
        fetchTasks();
        toast.success('Task created successfully! ✅');
      } else {
        toast.error('Failed to create task');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      project_id: task.project_id
    });
    setShowEditModal(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editingTask)
      });
      
      if (response.ok) {
        setShowEditModal(false);
        setEditingTask(null);
        fetchTasks();
        toast.success('Task updated successfully! ✅');
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        fetchTasks();
        toast.success('Task deleted successfully!');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and track your tasks</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          <span>New Task</span>
        </button>
      </div>

      {/* Tasks List */}
      {tasks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
          {tasks.map((task, index) => (
            <div key={index} className="p-5 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{task.title || 'Untitled Task'}</h3>
                    {task.project_name && (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                        <i className="fas fa-folder mr-1"></i>
                        {task.project_name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description || 'No description provided'}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      <i className={`fas ${
                        task.status === 'completed' ? 'fa-check-circle' :
                        task.status === 'in_progress' ? 'fa-spinner' :
                        'fa-clock'
                      } mr-1`}></i>
                      {task.status || 'pending'}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'low' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      <i className="fas fa-flag mr-1"></i>
                      {task.priority || 'medium'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit task"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id || index)}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-16 text-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-tasks text-blue-400 text-5xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Tasks Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Create your first task to start tracking your work and staying organized</p>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Create Your First Task</span>
          </button>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Complete project documentation"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={newTask.project_id}
                  onChange={(e) => setNewTask({...newTask, project_id: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {projects.length === 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    Please create a project first before adding tasks
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What needs to be done..."
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleUpdateTask} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Complete project documentation"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={editingTask.project_id}
                  onChange={(e) => setEditingTask({...editingTask, project_id: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What needs to be done..."
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;