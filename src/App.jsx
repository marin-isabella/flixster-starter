import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MovieList from './MovieList.jsx';
import Modal from './Modal.jsx';
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

  const loadMore = () => {
    setPageNumber(prevPage => prevPage + 1);
  }

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

  const handleSort = (sortOption) => {
    setSortOption(sortOption);

    // resets sorting state and fetches movies again when now playing selected on drop down (to unsort movies)
    if (sortOption === 'now-playing') {
      setIsSorted(false);
      fetchMovies('', 1);
      return;
    }

    setIsSorted(true);

    // Reference to compare 2 strings alphabetically: https://stackoverflow.com/questions/10198257/comparing-2-strings-alphabetically-for-sorting-purposes
    // Reference to compare 2 dates: https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    setMovieData(prev => {
      const sortedResults = [...prev.results].sort((a, b) => {
        if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortOption === 'release-date') {
          return new Date(b.release_date) - new Date(a.release_date);
        } else if (sortOption === 'vote-average') {
          return b.vote_average - a.vote_average;
        }
        return 0;
      });

      return {
        ...prev,
        results: sortedResults
      };
    });
  }

  useEffect(() => {
    fetchMovies(query, pageNumber);
  }, [pageNumber, query]);

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

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchMovies('', 1);
    fetchGenres();
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear} onSort={handleSort}/>
      <main className="main">
        <MovieList movies={movieData.results} loadMore={loadMore} isSorted={isSorted} onMovieSelect={handleMovieSelect}
        />
      </main>
      <Footer />
      {showModal && selectedMovie && (
        <Modal movie={selectedMovie} genres={genreData} onClose={handleCloseModal} show={showModal}/>
      )}
    </>
  )
}

export default App;
