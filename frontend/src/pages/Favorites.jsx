import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className={`container mx-auto p-4 pt-10 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-xl font-bold mb-4 relative inline-block underline-custom">My Favorites</h1>
        {favorites.length === 0 ? (
          <p>No favorites added yet!</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {favorites.map((movie, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <MovieCard movie={movie} onMovieSelect={(selectedMovie) => {
                  navigate(`/movie/${selectedMovie.id}`);
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;