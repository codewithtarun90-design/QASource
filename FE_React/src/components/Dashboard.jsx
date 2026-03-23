import React from 'react';

const Dashboard = ({ user, currentDate, currentTime, stats, recentTasks, activities, progress }) => {
    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, {user.username}! Here's what's happening today.</p>
                </div>
                <div className="text-right bg-white px-6 py-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">{currentDate}</p>
                    <p className="text-lg font-semibold text-gray-700">{currentTime}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tasks" value={stats.total_tasks || 0} change="12% from last week" icon="fas fa-tasks" iconBg="bg-blue-100" iconColor="text-blue-600" changeColor="text-green-600" />
                <StatCard title="In Progress" value={stats.in_progress || 0} change="Active now" icon="fas fa-spinner" iconBg="bg-yellow-100" iconColor="text-yellow-600" changeColor="text-blue-600" />
                <StatCard title="Completed" value={stats.completed || 0} change="This month" icon="fas fa-check-circle" iconBg="bg-green-100" iconColor="text-green-600" changeColor="text-green-600" />
                <StatCard title="Projects" value={stats.total_projects || 0} change="Active projects" icon="fas fa-folder-open" iconBg="bg-purple-100" iconColor="text-purple-600" changeColor="text-purple-600" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Tasks */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            <i className="fas fa-list-check mr-2 text-primary"></i>Recent Tasks
                        </h2>
                        <a href="/tasks" className="text-sm text-primary hover:underline">View all</a>
                    </div>

                    <div className="space-y-4">
                        {recentTasks.length > 0 ? recentTasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        )) : (
                            <EmptyTasks />
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <QuickActions />

                    {/* Activity Feed */}
                    <ActivityFeed activities={activities} />

                    {/* Progress Chart */}
                    <ProgressChart progress={progress} />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon, iconBg, iconColor, changeColor }) => (
    <div className="card bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                <p className={`text-xs ${changeColor} mt-2`}>
                    <i className="fas fa-arrow-up mr-1"></i>{change}
                </p>
            </div>
            <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`${icon} ${iconColor} text-xl`}></i>
            </div>
        </div>
    </div>
);

const TaskCard = ({ task }) => (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary transition cursor-pointer" onClick={() => window.location.href=`/tasks/${task.id}`}>
        <div className="flex-shrink-0">
            <input type="checkbox" checked={task.status === 'completed'} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" readOnly />
        </div>
        <div className="ml-4 flex-1">
            <h3 className={`font-semibold text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
            <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                <span><i className="fas fa-folder mr-1"></i>{task.project_name}</span>
                {task.due_date && <span><i className="fas fa-calendar mr-1"></i>{task.due_date}</span>}
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <PriorityBadge priority={task.priority} />
            {task.assigned_to && <AssignedBadge name={task.assigned_to_name} />}
        </div>
    </div>
);

const PriorityBadge = ({ priority }) => {
    let badgeClass = "", badgeText = "";
    switch(priority) {
        case 'high':
            badgeClass = "bg-red-100 text-red-700";
            badgeText = "High";
            break;
        case 'medium':
            badgeClass = "bg-yellow-100 text-yellow-700";
            badgeText = "Medium";
            break;
        default:
            badgeClass = "bg-green-100 text-green-700";
            badgeText = "Low";
    }
    return <span className={`px-3 py-1 ${badgeClass} text-xs font-semibold rounded-full`}>{badgeText}</span>;
};

const AssignedBadge = ({ name }) => (
    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold" title={name}>
        {name.charAt(0).toUpperCase()}
    </div>
);

const EmptyTasks = () => (
    <div className="text-center py-12">
        <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
        <button onClick={() => window.location.href='/tasks/new'} className="mt-4 btn bg-primary text-white px-6 py-2 rounded-lg">
            <i className="fas fa-plus mr-2"></i>Create Task
        </button>
    </div>
);

const QuickActions = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            <i className="fas fa-bolt mr-2 text-yellow-500"></i>Quick Actions
        </h2>
        <div className="space-y-3">
            <button onClick={() => window.location.href='/tasks/new'} className="w-full flex items-center p-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition">
                <i className="fas fa-plus-circle mr-3"></i>
                <span className="font-medium">New Task</span>
            </button>
            <button onClick={() => window.location.href='/projects/new'} className="w-full flex items-center p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                <i className="fas fa-folder-plus mr-3"></i>
                <span className="font-medium">New Project</span>
            </button>
            <button onClick={() => window.location.href='/teams/new'} className="w-full flex items-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                <i className="fas fa-user-plus mr-3"></i>
                <span className="font-medium">Invite Team</span>
            </button>
        </div>
    </div>
);

const ActivityFeed = ({ activities }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            <i className="fas fa-clock mr-2 text-blue-500"></i>Recent Activity
        </h2>
        <div className="space-y-4">
            {activities.length > 0 ? activities.map((activity, index) => (
                <div className="flex items-start" key={index}>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`fas fa-${activity.icon} text-blue-600 text-xs`}></i>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-800">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time_ago}</p>
                    </div>
                </div>
            )) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
            )}
        </div>
    </div>
);

const ProgressChart = ({ progress }) => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
            <i className="fas fa-chart-pie mr-2 text-green-500"></i>Task Progress
        </h2>
        <div className="space-y-3">
            <ProgressBar label="Completed" percent={progress.completed_percent || 0} color="bg-green-500" />
            <ProgressBar label="In Progress" percent={progress.in_progress_percent || 0} color="bg-yellow-500" />
            <ProgressBar label="Pending" percent={progress.pending_percent || 0} color="bg-blue-500" />
        </div>
    </div>
);

const ProgressBar = ({ label, percent, color }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-800">{percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

export default Dashboard;
