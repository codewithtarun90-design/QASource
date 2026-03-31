import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ width: '0%', color: '#6b7280', text: 'Weak' });
    const history = useHistory();

    const togglePassword = (fieldId) => {
        const passwordInput = document.getElementById(fieldId);
        const icon = document.getElementById(`toggle-${fieldId}-icon`);

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    const handlePasswordInput = (e) => {
        const password = e.target.value;
        setPassword(password);

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981'];
        const texts = ['Weak', 'Fair', 'Good', 'Strong'];
        const widths = ['25%', '50%', '75%', '100%'];

        setPasswordStrength({
            width: widths[strength - 1] || '25%',
            color: colors[strength - 1] || colors[0],
            text: texts[strength - 1] || texts[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = { username, email, password };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                history.push('/dashboard');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-primary rounded-full mb-4">
                        <i className="fas fa-user-plus text-white text-3xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join us and start managing tasks</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                        <div className="flex items-center">
                            <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                <form id="register-form" className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-user mr-2 text-gray-400"></i>Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-envelope mr-2 text-gray-400"></i>Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-lock mr-2 text-gray-400"></i>Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={handlePasswordInput}
                            />
                            <button type="button" onClick={() => togglePassword('password')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                <i className="fas fa-eye" id="toggle-password-icon"></i>
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center text-xs" id="password-strength">
                                <div className="flex-1 h-1 bg-gray-200 rounded mr-2">
                                    <div id="strength-bar" className="h-1 rounded transition-all duration-300" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}></div>
                                </div>
                                <span id="strength-text" className="text-gray-500" style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-lock mr-2 text-gray-400"></i>Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button type="button" onClick={() => togglePassword('confirm_password')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                <i className="fas fa-eye" id="toggle-confirm-password-icon"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <input type="checkbox" id="terms" name="terms" required className="w-4 h-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary" />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                            I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                            and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-lg hover:shadow-xl">
                        <i className="fas fa-user-plus mr-2"></i>Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">Already have an account?
                        <a href="/login" className="text-primary font-semibold hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
