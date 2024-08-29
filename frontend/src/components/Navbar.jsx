import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import Searchbar from './Searchbar';
import { ThemeContext } from '../../ThemeContext.jsx';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setProfilePic(user.profile_pic); 
    }
  }, []);

  const handleViewFavorites = () => {
    navigate('/favorites');
  };

  const handleLoginClick = () => {
    navigate('/register');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {

    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} z-20`}>
        <div className='flex flex-col md:flex-row gap-3 md:items-center w-full'>
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              MovieSearch
            </h1>
            <FaBars 
              className="text-2xl cursor-pointer md:hidden ml-4"
              onClick={toggleMenu}
            />
          </div>
          <Searchbar onSearch={onSearch} />
        </div>
        <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
          <FaHeart
            className="text-blue-400 text-2xl cursor-pointer hover:text-blue-500 transition duration-300"
            onClick={handleViewFavorites}
          />
          {theme === 'dark' ? (
            <FaSun
              className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
              onClick={toggleTheme}
            />
          ) : (
            <FaMoon
              className="text-blue-400 text-2xl cursor-pointer hover:text-blue-300 transition duration-300"
              onClick={toggleTheme}
            />
          )}
          {isLoggedIn ? (
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition duration-300"
                onClick={toggleDropdown} 
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/profile')}
                  >
                    Your Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={handleLoginClick}
            >
              Login/Signup
            </button>
          )}
        </div>

        {/* Sidebar for mobile */}
        <div className={`fixed top-0 right-0 w-3/4 h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-30`}>
          <div className="flex items-center justify-between p-4">
            <h1 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              MovieSearch
            </h1>
            <FaTimes 
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex flex-col items-center mt-10 space-y-4">
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className='flex gap-3 text-lg'>
                <p>Favorites</p>
                <FaHeart
                  className="text-blue-400 text-2xl cursor-pointer hover:text-blue-500 transition duration-300"
                  onClick={handleViewFavorites}
                />
              </div>
              <div className='flex gap-3 text-lg'>
                <p>Change Theme</p>
                {theme === 'dark' ? (
                  <FaSun
                    className="text-yellow-400 text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
                    onClick={toggleTheme}
                  />
                ) : (
                  <FaMoon
                    className="text-blue-400 text-2xl cursor-pointer hover:text-blue-300 transition duration-300"
                    onClick={toggleTheme}
                  />
                )}
              </div>
              {isLoggedIn ? (
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition duration-300"
                    onClick={toggleDropdown} 
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate('/profile')}
                      >
                        Your Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={handleLoginClick}
                >
                  Login/Signup
                </button>
              )}
            </div>
          </div>
        </div>
        {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleMenu}></div>}
      </nav>
      <div className="main-content">
      </div>
    </>
  );
};

export default Navbar;