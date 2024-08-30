import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContext'; 
import axios from 'axios';

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:5000/api/user/search-history',
          { query },
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );

        onSearch(query);
      } catch (error) {
        console.error('Error saving search query:', error);
      }
    }
  };

  return (
    <div className={`flex items-center border-b-2 w-full md:w-auto mb-4 md:mb-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-transparent border-none py-2 px-3 w-full focus:outline-none focus:ring-0 ${theme === 'dark' ? 'placeholder-gray-400 text-white' : 'placeholder-gray-600 text-black'}`}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 rounded-lg transition duration-300 flex items-center justify-center"
      >
        <FaSearch className="text-blue-400 text-lg" />
      </button>
    </div>
  );
}

export default Searchbar;
