import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LoginComponent from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <LoginComponent />}
          </Route>
          
          <Route path="/dashboard">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="dashboard" />}
          </Route>

          <Route path="/projects">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="projects" />}
          </Route>

          <Route path="/tasks">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="tasks" />}
          </Route>

          <Route path="/calendar">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="calendar" />}
          </Route>

          <Route path="/teams">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="teams" />}
          </Route>

          <Route path="/reports">
            {!user ? <Redirect to="/" /> : <AppLayout user={user} onLogout={handleLogout} page="reports" />}
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

function AppLayout({ user, onLogout, page }) {
  const [stats, setStats] = useState({
    total_tasks: 0,
    in_progress: 0,
    completed: 0,
    total_projects: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState({
    completed_percent: 0,
    in_progress_percent: 0,
    pending_percent: 0
  });
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [teamData, setTeamData] = useState({ members: [], total_members: 0, total_tasks: 0, total_projects: 0 });

  useEffect(() => {
    // Fetch dashboard data
    if (page === 'dashboard') {
      fetch('/api/dashboard')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setStats(data.data.stats || {});
            setRecentTasks(data.data.recent_tasks || []);
            setActivities(data.data.activities || []);
          }
        })
        .catch(err => console.error('Failed to fetch dashboard data:', err));
    }
    
    // Fetch projects and tasks count for Reports page
    if (page === 'reports') {
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProjectCount(data.projects?.length || 0);
          }
        })
        .catch(err => console.error('Failed to fetch projects:', err));
        
      fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTaskCount(data.tasks?.length || 0);
          }
        })
        .catch(err => console.error('Failed to fetch tasks:', err));
    }
    
    // Fetch team data for Teams page
    if (page === 'teams') {
      fetch('/api/teams')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setTeamData(data.data);
          }
        })
        .catch(err => console.error('Failed to fetch team data:', err));
    }
  }, [page]);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const renderPage = () => {
    switch(page) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            currentDate={currentDate}
            currentTime={currentTime}
            stats={stats}
            recentTasks={recentTasks}
            activities={activities}
            progress={progress}
          />
        );
      case 'projects':
        return <Projects />;
      case 'tasks':
        return <Tasks />;
      case 'calendar':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
                <p className="text-gray-600 mt-1">View and manage your schedule</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-calendar text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Calendar View</h3>
              <p className="text-gray-600 mb-6">Calendar functionality with task scheduling coming soon</p>
              <div className="grid grid-cols-7 gap-2 max-w-2xl mx-auto">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 bg-blue-50 text-blue-700 font-semibold rounded">{day}</div>
                ))}
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="p-2 border border-gray-200 rounded hover:bg-gray-50">{i + 1}</div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'teams':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
                <p className="text-gray-600 mt-1">Manage your team members and collaboration</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2">
                <i className="fas fa-plus"></i>
                <span>Add Team Member</span>
              </button>
            </div>
            
            {/* Team Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Total Members</p>
                    <p className="text-3xl font-bold text-gray-800">{teamData.total_members}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Total Tasks</p>
                    <p className="text-3xl font-bold text-gray-800">{teamData.total_tasks}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-tasks text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-1">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-800">{teamData.total_projects}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-folder text-purple-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.members.map((member, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {member.avatar}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <i className="fas fa-tasks mr-2 text-blue-500"></i>
                        Tasks
                      </span>
                      <span className="font-semibold text-gray-800">{member.tasks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <i className="fas fa-folder mr-2 text-purple-500"></i>
                        Projects
                      </span>
                      <span className="font-semibold text-gray-800">{member.projects}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                <p className="text-gray-600 mt-1">View analytics and generate reports</p>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
                <i className="fas fa-download mr-2"></i>Export Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Projects', value: projectCount, icon: 'folder', color: 'blue' },
                { title: 'Total Tasks', value: taskCount, icon: 'tasks', color: 'green' },
                { title: 'Completed', value: '0', icon: 'check-circle', color: 'purple' },
                { title: 'In Progress', value: '0', icon: 'clock', color: 'orange' }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`fas fa-${stat.icon} text-${stat.color}-600 text-xl`}></i>
                  </div>
                  <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <i className="fas fa-chart-bar text-gray-300 text-6xl mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">Advanced reporting and analytics features coming soon</p>
            </div>
          </div>
        );
      default:
        return <Dashboard user={user} currentDate={currentDate} currentTime={currentTime} stats={stats} recentTasks={recentTasks} activities={activities} progress={progress} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar user={user} activePage={page} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
