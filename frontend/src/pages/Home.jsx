import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import MovieDetails from './MovieDetails'; 
import { ThemeContext } from '../../ThemeContext'; 

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchMoviesFromJson = async () => {
      try {
        const response = await axios.get('/movies.json');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies from JSON:', error);
      }
    };

    fetchMoviesFromJson();
  }, []);

  const handleSearch = (query) => {
    navigate(`/search/${query}`);
  };

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={`container p-4 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar onSearch={handleSearch} />
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      )}
    </div>
  );
}

export default Home;