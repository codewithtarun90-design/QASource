import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ username: 'Guest' });
  const history = useHistory();

  useEffect(() => {
    // Fetch project data and tasks
    fetchProjectData();
    fetchTasks();
  }, [projectId]);

  const fetchProjectData = async () => {
    // Replace with actual API call
    const projectData = {
      name: 'Sample Project',
      description: 'This is a sample project',
      status: 'active',
      progress: 50,
      completed_tasks: 5,
      total_tasks: 10,
      priority: 'medium',
    };
    setProject(projectData);
  };

  const fetchTasks = async () => {
    // Replace with actual API call
    const tasksData = [
      { id: 1, title: 'Task 1', status: 'todo', priority: 'high', due_date: '2023-12-01', assigned_to_name: 'John Doe' },
      { id: 2, title: 'Task 2', status: 'done', priority: 'medium', due_date: '2023-12-05', assigned_to_name: 'Jane Smith' },
    ];
    setTasks(tasksData);
  };

  const updateTaskStatus = async (taskId, isCompleted) => {
    const newStatus = isCompleted ? 'done' : 'todo';
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (sessionStorage.getItem('token') || ''),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTasks();
      } else {
        alert('Error: ' + (data.error || 'Failed to update task'));
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Update task error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              <i className="fas fa-tasks mr-2"></i>TaskFlow
            </Link>
            <nav className="flex space-x-4 ml-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              <Link to="/projects" className="text-blue-600 font-semibold">Projects</Link>
              <Link to="/tasks" className="text-gray-600 hover:text-blue-600">Tasks</Link>
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

      <div className="p-6">
        <div className="mb-6">
          <Link to="/projects" className="text-blue-600 hover:underline">
            <i className="fas fa-arrow-left mr-2"></i>Back to Projects
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative">
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                  <p className="text-white/90 mt-1">{project.description || 'No description'}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => alert('Edit feature coming soon')} className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100">
                    <i className="fas fa-edit mr-2"></i>Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                {project.status === 'active' ? (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    <i className="fas fa-circle text-xs mr-2"></i>Active
                  </span>
                ) : project.status === 'completed' ? (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    <i className="fas fa-check-circle text-xs mr-2"></i>Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{project.progress || 0}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasks</p>
                <p className="text-lg font-semibold text-gray-800">
                  {project.completed_tasks || 0} / {project.total_tasks || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Priority</p>
                {project.priority === 'high' ? (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">High</span>
                ) : project.priority === 'medium' ? (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">Medium</span>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">Low</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              <i className="fas fa-list-check mr-2 text-blue-600"></i>Project Tasks
            </h2>
            <Link to={`/tasks/new?project_id=${projectId}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <i className="fas fa-plus mr-2"></i>Add Task
            </Link>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-center p-4 border border-gray-200 rounded-lg ${task.status === 'done' ? 'bg-gray-50' : 'hover:border-blue-500'} transition`}>
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    disabled={task.status === 'done'}
                    className={`w-5 h-5 text-blue-500 border-gray-300 rounded ${task.status === 'done' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onChange={() => updateTaskStatus(task.id, task.status !== 'done')}
                  />
                  <div className="ml-4 flex-1">
                    <h3 className={`font-semibold text-gray-800 ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                    <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                      {task.due_date && <span><i className="fas fa-calendar mr-1"></i>{task.due_date}</span>}
                      {task.assigned_to_name && <span><i className="fas fa-user mr-1"></i>{task.assigned_to_name}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {task.priority === 'high' ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">High</span>
                    ) : task.priority === 'medium' ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Medium</span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Low</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-tasks text-gray-300 text-5xl mb-4"></i>
              <p className="text-gray-500 mb-4">No tasks in this project yet</p>
              <Link to={`/tasks/new?project_id=${projectId}`} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block">
                <i className="fas fa-plus mr-2"></i>Create First Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
