import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContext'; 

const languageMap = {
  en: 'English',
  ta: 'Tamil',
  ml: 'Malayalam',
  te: 'Telugu',
  hi: 'Hindi',
  fr: 'French',
  kn: 'Kannada',
};

function MovieCard({ movie, onMovieSelect }) {
  const { theme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onMovieSelect(movie)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border p-4 rounded-lg cursor-pointer transform hover:scale-105 transition duration-300 shadow-lg max-w-sm w-full ${theme === 'dark' ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-contain mb-4 rounded transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>
      <h3 className={`text-lg font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{movie.title}</h3>
      {isHovered && (
        <div className="mt-2">
          <p className={`text-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>📅 {movie.release_date}</p>
          <p className={`text-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>⭐ {movie.vote_average} / 10</p>
          <p className={`text-md ${theme === 'dark' ? 'text-white' : 'text-black'}`}>🌐 {languageMap[movie.original_language] || movie.original_language.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}

export default MovieCard;