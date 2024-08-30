import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); 
      setResponseMessage('Login successful!');
      navigate('/'); 
    } catch (err) {
      setResponseMessage(err.response.data.msg || 'An error occurred.');
    }
  };

  const themeClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const inputClasses = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-3`}>
      <div className={`w-full max-w-md p-8 space-y-6 ${themeClasses} rounded-lg shadow-md`}>
        <h2 className="text-3xl font-extrabold text-center">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${inputClasses}`}
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${inputClasses}`}
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        {responseMessage && <p className="mt-2 text-center text-sm text-red-600">{responseMessage}</p>}
        <p className={`mt-2 text-center text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-600">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
