import React, { useState } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';
import { useEffect } from 'react';

const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

const MovieList = () => {
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${AUTH_KEY}`
            }
          };

          fetch(NOW_PLAYING_URL, config)
            .then(res => res.json())
            .then(json => setMovieData(json))
            .catch(err => console.error(err));
      }, [])
    console.log(movieData.results);
    return (
        <div className="movie-list">
            {
                movieData.results && movieData.results.map(movie => {
                    return (
                        <MovieCard key={movie.id} image={movie.poster_path} title={movie.original_title} rating={movie.vote_average}/>
                    )
                })
            }
        </div>
    )
}

export default MovieList;
