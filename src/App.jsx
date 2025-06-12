import './App.css';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import MovieList from './components/MovieList/MovieList.jsx';
import Modal from './components/Modal/Modal.jsx';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

function App() {
  const [movieData, setMovieData] = useState({ results: []});
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [genreData, setGenreData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [movieRuntime, setMovieRuntime] = useState([]);

  const fetchMovies = (searchQuery = '', page = 1) => {
    let endpoint_url = '';
    if (searchQuery) {
      endpoint_url = `${BASE_URL}/search/movie?query=${searchQuery}&page=${page}&language=en-US&include_adult=false`;
    } else {
      endpoint_url = `${BASE_URL}/movie/now_playing?language=en-US&page=${page}`;
    }


  const config = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
    }
  };

  fetch(endpoint_url, config)
    .then(res => res.json())
    .then(json => {
      // appends the new results to existing movie data results when page number is greater than 1
      if (page === 1) {
        setMovieData(json);
      } else {
        setMovieData(prev => ({...json, results: [...prev.results, ...json.results]}));
      }
    })
    .catch(err => console.log(err));

  };
  console.log(movieData);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPageNumber(1);
    fetchMovies(searchQuery, 1);
  };

  const handleClear = () => {
    setQuery('');
    setPageNumber(1);
    setIsSorted(false);
    fetchMovies('', 1);
  }

  // used to sort movies and has default case for 'now-playing' to return unsorted list
  const getSortedMovies = (movies) => {
    if (!movies) {
      return [];
    }

    const moviesCopy = [...movies];

    // Reference to compare 2 strings alphabetically: https://stackoverflow.com/questions/10198257/comparing-2-strings-alphabetically-for-sorting-purposes
    // Reference to compare 2 dates: https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    if (sortOption === 'title') {
      return moviesCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'release-date') {
      return moviesCopy.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'vote-average') {
      return moviesCopy.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      return moviesCopy;
    }
  };

  const handleSort = (sortOption) => {
    setSortOption(sortOption);

    if (sortOption === 'now-playing') {
      setIsSorted(false);
      fetchMovies('', 1);
      return;
    }

    setIsSorted(true);

    setMovieData(prev => {
      const sortedResults = getSortedMovies(prev.results);
      return {
        ...prev,
        results: sortedResults
      };
    });
  }

  const loadMore = () => {
    setPageNumber(prevPage => prevPage + 1);
  }

  // fetch genres to compare against genre ids from movie data results
  const fetchGenres = () => {
    const endpoint_url = `${BASE_URL}/genre/movie/list?language=en-US`;

    const config = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_KEY}`,
      }
    };

    fetch(endpoint_url, config)
      .then(res => res.json())
      .then(json => {
        setGenreData(json.genres);
      })
      .catch(err => console.log(err));
  };

  // fetch runtime of movies - requires new API call for each movie card clicked on (passing in movie id)
  const fetchRuntime = (movieId) => {
    if (!movieId) {
      return;
    }

    const endpoint_url = `${BASE_URL}/movie/${movieId}?language=en-US`;

    const config = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_KEY}`,
      }
    }

    fetch(endpoint_url, config)
    .then(res => res.json())
    .then(json => {
      setMovieRuntime(json.runtime);
    })
    .catch(err => console.log(err));
  }

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    fetchRuntime(movie.id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchMovies(query, pageNumber);
    fetchGenres();
  }, [pageNumber, query]);

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear} onSort={handleSort}/>
      <main className="main">
        <MovieList movies={getSortedMovies(movieData.results)} loadMore={loadMore} isSorted={isSorted} onMovieSelect={handleMovieSelect}/>
      </main>
      <Footer />
      {showModal && selectedMovie && (
        <Modal movie={selectedMovie} genres={genreData} onClose={handleCloseModal} show={showModal} movieRuntime={movieRuntime}/>
      )}
    </>
  )
}

export default App;
