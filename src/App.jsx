import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MovieList from './MovieList.jsx';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

function App() {
  const[movieData, setMovieData] = useState({ results: []});
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

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
    fetchMovies('', 1);
  }

  useEffect(() => {
    // Fetch movies whenever pageNumber or query changes
    fetchMovies(query, pageNumber);
  }, [pageNumber, query]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies('', 1);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} onClear={handleClear}/>
      <main className="main">
        <MovieList movies={movieData.results} loadMore={loadMore}/>
      </main>
      <Footer />
    </>
  )
}

export default App;
