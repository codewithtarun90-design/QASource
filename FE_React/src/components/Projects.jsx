import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
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
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newProject)
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewProject({ name: '', description: '', status: 'active' });
        fetchProjects();
        toast.success('Project created successfully! 🎉');
      } else {
        toast.error('Failed to create project');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status
    });
    setShowEditModal(true);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editingProject)
      });
      
      if (response.ok) {
        setShowEditModal(false);
        setEditingProject(null);
        fetchProjects();
        toast.success('Project updated successfully! 🎉');
      } else {
        toast.error('Failed to update project');
      }
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Failed to update project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        fetchProjects();
        toast.success('Project deleted successfully!');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
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
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and organize your projects</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
                <div className="text-white text-center">
                  <i className="fas fa-folder text-4xl opacity-20"></i>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="w-9 h-9 bg-white bg-opacity-20 hover:bg-blue-500 hover:bg-opacity-100 rounded-full flex items-center justify-center text-white transition-all duration-200"
                    title="Edit project"
                  >
                    <i className="fas fa-edit text-sm"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id || index)}
                    className="w-9 h-9 bg-white bg-opacity-20 hover:bg-red-500 hover:bg-opacity-100 rounded-full flex items-center justify-center text-white transition-all duration-200"
                    title="Delete project"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.name || 'Untitled Project'}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">{project.description || 'No description provided'}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'archived' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {project.status || 'Active'}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <i className="fas fa-calendar"></i>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-16 text-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-folder-open text-blue-400 text-5xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Projects Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Get started by creating your first project to organize your tasks and collaborate with your team</p>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            <span>Create Your First Project</span>
          </button>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create New Project</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Website Redesign"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief description of your project..."
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Project</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleUpdateProject} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Website Redesign"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief description of your project..."
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={editingProject.status}
                  onChange={(e) => setEditingProject({...editingProject, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
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
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
