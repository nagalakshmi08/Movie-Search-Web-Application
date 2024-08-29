import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import { ThemeContext } from '../../ThemeContext';
import Navbar from '../components/Navbar';

const API_KEY = import.meta.env.VITE_API_KEY;

function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleSearch = (searchTerm) => {
    navigate(`/search/${searchTerm}`);
  };
  
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className={`container mx-auto p-4 mt-4 md:mt-0 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Search Results for "{query}"</h1>
        <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      </div>
    </>
  );
}

export default SearchResults;