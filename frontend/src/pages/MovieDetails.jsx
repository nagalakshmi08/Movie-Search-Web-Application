import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaThumbsUp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MovieCard from '../components/MovieCard';
import { ThemeContext } from '../../ThemeContext'; 
import Navbar from '../components/Navbar';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [rating, setRating] = useState(0);
  const [videos, setVideos] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);
        setRating(movieResponse.data.vote_average);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(creditsResponse.data.cast.slice(0, 8));

        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideos(videosResponse.data.results);

        const recommendationsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        setRecommendations(recommendationsResponse.data.results);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === movieResponse.data.id));

        const reviewsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
        );
        setReviews(reviewsResponse.data.results);

      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      favorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    alert(`${movie.title} has been ${isFavorite ? 'removed from' : 'added to'} your favorites!`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReviewObj = {
      author: user ? user.name : 'Anonymous', 
      content: newReview,
      created_at: new Date().toISOString(),
    };
    setReviews([...reviews, newReviewObj]);
    setNewReview('');
  };

  if (!movie) return <div className="text-center">Loading...</div>;

  const topGenres = movie.genres.slice(0, 2);

  const handleSearch = (searchTerm) => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div 
        className={`relative mt-8 md:mt-0 bg-center bg-cover bg-no-repeat overflow-hidden ${theme === 'dark' ? 'text-white' : 'text-black'}`} 
        style={{
          backgroundImage: theme === 'dark' 
            ? `linear-gradient(to bottom, rgba(0, 0, 0.7, 0.7), rgba(0, 0, 0, 0.8)), url('https://image.tmdb.org/t/p/original/${movie?.poster_path}')` 
            : `linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)), url('https://image.tmdb.org/t/p/original/${movie?.poster_path}')`, 
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }}
      >
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black opacity-50' : 'bg-white opacity-50'}`}></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        <div className="relative container mx-auto p-4 md:p-8 lg:p-12 flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto md:w-1/3 lg:w-1/4 mb-4 rounded-lg shadow-lg"
          />
          <div className="md:ml-6 flex flex-col w-full md:w-2/3">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
              <div className="ml-4">
                {isFavorite ? (
                  <FaHeart
                    className="text-3xl cursor-pointer text-blue-400 transition-transform transform hover:scale-110"
                    onClick={handleAddToFavorites}
                  />
                ) : (
                  <FaRegHeart
                    className="text-3xl cursor-pointer text-blue-400 transition-transform transform hover:scale-110"
                    onClick={handleAddToFavorites}
                  />
                )}
              </div>
            </div>
            <p className="text-base md:text-lg mb-4 font-medium">
              {movie.overview}
            </p>
            <div className="flex mb-4">
              {topGenres.map((genre) => (
                <span
                  key={genre.id}
                  className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mr-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className='mt-4 flex items-center gap-3'>
              <h2 className="text-lg font-semibold">Rating:</h2>
              <p className="text-blue-400 text-lg"><FaThumbsUp className="inline mr-2 text-blue-400" />{rating}</p>
            </div>
            <h2 className="text-lg font-semibold mt-4">Cast:</h2>
            <div className="flex overflow-x-auto gap-4 pt-2 md:p-4">
              {cast.map((member) => (
                <div key={member.id} className="flex-shrink-0 text-center w-24">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mb-2 border-2 border-white shadow-md mx-auto"
                  />
                  <p className="text-sm break-words">{member.name}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="relative mt-8 container mx-auto p-4 md:p-8">
          <h2 className="text-lg font-semibold mb-4 underline-custom">Related Videos:</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="relative mb-4">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    style={{ border: '0px' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.name}
                  ></iframe>
                  <p className="mt-2 text-sm">{video.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Movie Recommendations */}
        <div className="relative mt-8 container mx-auto p-4 md:p-8">
          <h2 className="text-lg font-semibold mb-4 underline-custom">Recommended Movies:</h2>
          <div className="flex overflow-x-auto gap-6 pb-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="flex-shrink-0">
                <MovieCard
                  movie={rec}
                  onMovieSelect={(selectedMovie) => {
                    navigate(`/movie/${selectedMovie.id}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="relative mt-8 container mx-auto p-4 md:p-8">
          <h2 className="text-lg font-semibold mb-4 underline-custom">Reviews:</h2>
          <form onSubmit={handleReviewSubmit} className="mb-4">
            <textarea
              className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
              rows="4"
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit Review
            </button>
          </form>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className={`p-4 rounded-md shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                <p className="mt-2">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;