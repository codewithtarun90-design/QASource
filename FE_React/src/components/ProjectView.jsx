import React, { useState } from 'react';

const ProjectView = ({ project, tasks, members, activities }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      console.log('Delete project:', projectId);
      // Implement delete logic
    }
  };

  const showAddMemberModal = () => {
    alert('Add member modal - to be implemented');
  };

  const showAddMilestoneModal = () => {
    alert('Add milestone modal - to be implemented');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className={`h-32 bg-gradient-to-br from-${project.color_from || 'blue-500'} to-${project.color_to || 'purple-600'} relative`}>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                <p className="text-white/90 mt-1">{project.description}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => window.location.href=`/projects/${project.id}/edit`} className="btn bg-white text-gray-800 px-4 py-2 rounded-lg">
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
                <button onClick={() => deleteProject(project.id)} className="btn bg-red-500 text-white px-4 py-2 rounded-lg">
                  <i className="fas fa-trash mr-2"></i>Delete
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
                  <i className="fas fa-archive text-xs mr-2"></i>Archived
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Progress</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
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
              <p className="text-sm text-gray-600 mb-1">Due Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {project.due_date ? project.due_date_formatted : 'No deadline'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="border-b">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              className={`tab-button py-4 px-1 border-b-2 ${activeTab === 'tasks' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => handleTabSwitch('tasks')}
            >
              <i className="fas fa-tasks mr-2"></i>Tasks
            </button>
            <button
              className={`tab-button py-4 px-1 border-b-2 ${activeTab === 'members' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => handleTabSwitch('members')}
            >
              <i className="fas fa-users mr-2"></i>Members
            </button>
            <button
              className={`tab-button py-4 px-1 border-b-2 ${activeTab === 'milestones' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => handleTabSwitch('milestones')}
            >
              <i className="fas fa-flag mr-2"></i>Milestones
            </button>
            <button
              className={`tab-button py-4 px-1 border-b-2 ${activeTab === 'activity' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => handleTabSwitch('activity')}
            >
              <i className="fas fa-history mr-2"></i>Activity
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'tasks' && (
            <div id="tasks-tab" className="tab-content">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Project Tasks</h2>
                <button onClick={() => window.location.href=`/tasks/new?project_id=${project.id}`} className="btn bg-primary text-white px-4 py-2 rounded-lg">
                  <i className="fas fa-plus mr-2"></i>Add Task
                </button>
              </div>

              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition cursor-pointer"
                      onClick={() => window.location.href=`/tasks/${task.id}`}
                    >
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="ml-4 flex-1">
                        <h3 className={`font-semibold text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                        <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                          {task.due_date && <span><i className="fas fa-calendar mr-1"></i>{task.due_date}</span>}
                          {task.tags.length > 0 && <span><i className="fas fa-tags mr-1"></i>{task.tags.join(', ')}</span>}
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

                        {task.assigned_to && (
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold" title={task.assigned_to_name}>
                            {task.assigned_to_name.substr(0, 1).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-tasks text-gray-300 text-5xl mb-4"></i>
                  <p className="text-gray-500 mb-4">No tasks in this project yet</p>
                  <button onClick={() => window.location.href=`/tasks/new?project_id=${project.id}`} className="btn bg-primary text-white px-6 py-2 rounded-lg">
                    <i className="fas fa-plus mr-2"></i>Create First Task
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'members' && (
            <div id="members-tab" className="tab-content">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
                <button onClick={showAddMemberModal} className="btn bg-primary text-white px-4 py-2 rounded-lg">
                  <i className="fas fa-user-plus mr-2"></i>Add Member
                </button>
              </div>

              {members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <div key={member.username} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                        {member.username.substr(0, 1).toUpperCase()}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-800">{member.username}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {member.role || 'Member'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-users text-gray-300 text-5xl mb-4"></i>
                  <p className="text-gray-500 mb-4">No team members yet</p>
                  <button onClick={showAddMemberModal} className="btn bg-primary text-white px-6 py-2 rounded-lg">
                    <i className="fas fa-user-plus mr-2"></i>Add First Member
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div id="milestones-tab" className="tab-content">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Milestones</h2>
                <button onClick={showAddMilestoneModal} className="btn bg-primary text-white px-4 py-2 rounded-lg">
                  <i className="fas fa-plus mr-2"></i>Add Milestone
                </button>
              </div>
              <p className="text-gray-500 text-center py-12">Milestones feature coming soon</p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div id="activity-tab" className="tab-content">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.description} className="flex items-start p-4 border-l-4 border-primary bg-gray-50 rounded">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`fas fa-${activity.icon}`}></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-800">{activity.description}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time_ago}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-12">No activity yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
