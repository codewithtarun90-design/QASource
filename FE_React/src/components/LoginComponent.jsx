import React, { useState } from 'react';

const LoginComponent = ({ error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = { username, password };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Use window.location for reliable navigation
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-600 rounded-full mb-4">
              <i className="fas fa-tasks text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-user mr-2 text-gray-400"></i>Username or Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-lock mr-2 text-gray-400"></i>Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
      type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="toggle-password-icon"></i>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Demo Credentials Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <i className="fas fa-user-shield text-green-600 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Demo Accounts</h3>
          <p className="text-gray-600 mt-2">Use these credentials to login</p>
        </div>

        <div className="space-y-4">
          {/* Admin Account */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800 text-lg">Administrator</h4>
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                Full Access
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-user text-blue-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Username:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">admin</code>
              </div>
              <div className="flex items-center">
                <i className="fas fa-key text-blue-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Password:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">Admin123</code>
              </div>
            </div>
          </div>

          {/* User Account */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800 text-lg">Regular User</h4>
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                Standard
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-user text-green-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Username:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">user</code>
              </div>
              <div className="flex items-center">
                <i className="fas fa-key text-green-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Password:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">User123</code>
              </div>
            </div>
          </div>

          {/* Guest Account */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800 text-lg">Guest</h4>
              <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                Read Only
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-user text-orange-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Username:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">guest</code>
              </div>
              <div className="flex items-center">
                <i className="fas fa-key text-orange-600 w-6"></i>
                <span className="text-sm text-gray-600 mr-2">Password:</span>
                <code className="bg-white px-3 py-1 rounded text-sm font-mono font-semibold text-gray-800">Guest123</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-blue-600 mt-1 mr-3"></i>
            <div>
              <p className="text-sm text-blue-800 font-semibold mb-1">Quick Login Tip</p>
              <p className="text-xs text-blue-700">
                Click on any credential above to automatically copy it to your clipboard for easy login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginComponent;
