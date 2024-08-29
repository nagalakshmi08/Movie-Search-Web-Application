import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { name, email, password, profile_pic } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profile_pic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setResponseMessage('Registration successful!');
      navigate('/login'); 
    } catch (err) {
      setResponseMessage(err.response.data.msg || 'An error occurred.');
    }
  };

  const themeClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const inputClasses = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-3`}>
      <div className={`w-full max-w-md p-8 space-y-6 ${themeClasses} rounded-lg shadow-md`}>
        <h2 className="text-3xl font-extrabold text-center">Create an Account</h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${inputClasses}`}
                placeholder="Name"
                value={name}
                onChange={onChange}
              />
            </div>
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
            <div>
              <label htmlFor="profile_pic" className="block text-sm font-medium mb-2">Profile Pic</label>
              <input
                id="profile_pic"
                name="profile_pic"
                type="file"
                accept="image/*"
                required
                className={`relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm ${inputClasses}`}
                onChange={onFileChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Register
            </button>
          </div>
        </form>
        {responseMessage && <p className="mt-2 text-center text-sm text-red-600">{responseMessage}</p>}
        <p className="mt-2 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;