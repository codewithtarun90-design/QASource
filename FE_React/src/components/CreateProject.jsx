import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active',
        priority: 'medium',
        start_date: '',
        end_date: '',
        budget: ''
    });
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Assuming token is stored in local storage or fetched from an API
        const sessionToken = window.localStorage.getItem('token') || '';
        if (!sessionToken) {
            console.error('No token found! Please login again.');
            alert('Session expired. Please login again.');
            history.push('/login');
        } else {
            setToken(sessionToken);
        }
    }, [history]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
        const projectData = {
            ...formData,
            start_date: formatDate(formData.start_date),
            end_date: formatDate(formData.end_date),
            budget: formData.budget ? parseFloat(formData.budget) : null
        };

        console.log('Sending project data:', projectData);
        console.log('Using token:', token.substring(0, 20) + '...');

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(projectData)
            });

            const data = await response.json();
            console.log('Response:', data);

            if (data.success) {
                alert('Project created successfully!');
                history.push('/projects');
            } else {
                alert('Error: ' + (data.error || data.errors || 'Failed to create project'));
                console.error('API Error:', data);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Create project error:', error);
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
                            <a href="/projects" className="text-blue-600 font-semibold">Projects</a>
                            <a href="/tasks" className="text-gray-600 hover:text-blue-600">Tasks</a>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Welcome, <strong>{/* User's username */}</strong></span>
                        <a href="/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                            <i className="fas fa-sign-out-alt mr-2"></i>Logout
                        </a>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-6">
                    <a href="/projects" className="text-blue-600 hover:underline">
                        <i className="fas fa-arrow-left mr-2"></i>Back to Projects
                    </a>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Project</h2>
                    <p className="text-gray-600 mb-6">Fill in the details to create a new project</p>

                    <form id="create-project-form" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Project Name <span className="text-red-500">*</span>
                            </label>
                            <input type="text" id="name" name="name" required
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="Enter project name" value={formData.name} onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea id="description" name="description" rows="4"
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Enter project description" value={formData.description} onChange={handleInputChange}></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select id="status" name="status"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.status} onChange={handleInputChange}>
                                    <option value="active">Active</option>
                                    <option value="on_hold">On Hold</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>
                                <select id="priority" name="priority"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.priority} onChange={handleInputChange}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input type="date" id="start_date" name="start_date"
                                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       value={formData.start_date} onChange={handleInputChange} />
                            </div>

                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input type="date" id="end_date" name="end_date"
                                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                       value={formData.end_date} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                Budget
                            </label>
                            <input type="number" id="budget" name="budget" step="0.01"
                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="Enter budget amount" value={formData.budget} onChange={handleInputChange} />
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                            <a href="/projects" className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                Cancel
                            </a>
                            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg">
                                <i className="fas fa-plus mr-2"></i>Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
