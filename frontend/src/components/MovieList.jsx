import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

function MovieList({ movies, onMovieSelect }) {
  const [visibleMovies, setVisibleMovies] = useState(10);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 10);
  };

  const handleSearch = (searchTerm) => {
    navigate(`/search/${searchTerm}`);
  };

  const moviesToShow = movies.slice(0, visibleMovies);

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className={`container mx-auto p-4 -mt-24 md:-mt-16 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-4 relative inline-block underline-custom">
          Popular Movies
        </h2>
        <div className="flex flex-wrap -mx-2">
          {moviesToShow.map((movie) => (
            <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <MovieCard movie={movie} onMovieSelect={onMovieSelect} />
            </div>
          ))}
        </div>
        {visibleMovies < movies.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleViewMore}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;