import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContext'; 

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/search-history`, {
          headers: {
            'x-auth-token': token
          }
        });
        setSearchHistory(response.data);
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    fetchSearchHistory();
  }, []);

  const handleDelete = async (query) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/search-history`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        data: { query } 
      });
      setSearchHistory(searchHistory.filter(item => item !== query));
    } catch (error) {
      console.error('Error deleting search query:', error);
    }
  };

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h2 className="text-2xl font-bold mb-4">Search History</h2>
      <ul className={`shadow-md rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {searchHistory.length === 0 ? (
          <li className="text-gray-500">No search history available.</li>
        ) : (
          searchHistory.map((query, index) => (
            <li
              key={index}
              className={`border-b py-2 last:border-none flex items-center justify-between ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <span>{query}</span>
              <button
                onClick={() => handleDelete(query)}
                className="text-blue-400 hover:text-blue-500"
              >
                <FaTimes />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchHistory;
