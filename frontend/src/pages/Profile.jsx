import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHistory from '../components/SearchHistory';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../../ThemeContext'; 

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return null; 
  }

  return (
    <>
      <Navbar />
      <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <h1 className="text-3xl font-bold mt-12 md:mt-4 mb-4">Your Profile</h1>
        <div className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-lg w-full max-w-md mx-4`}>
          <img
            src={user.profile_pic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold text-center mt-4">{user.name}</h2>
          <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
          <button
            className="mt-6 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300 w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="w-full max-w-4xl mx-auto mt-8">
          <SearchHistory />
        </div>
      </div>
    </>
  );
};

export default Profile;