import React, { useState } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';
import { useEffect } from 'react';
import LoadButton from './LoadButton.jsx';

const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;

const MovieList = () => {
    const [movieData, setMovieData] = useState({ results: [] });
    const [pageNumber, setPageNumber] = useState(1);

    const loadMore = () => {
        setPageNumber(prevPage => prevPage + 1);
    };

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${AUTH_KEY}`
            }
        };

        const NOW_PLAYING_URL = `${BASE_URL}&page=${pageNumber}`;

        fetch(NOW_PLAYING_URL, config)
            .then(res => res.json())
            .then(json => {
                if (pageNumber === 1) {
                    setMovieData(json);
                } else {
                    setMovieData(prevData => ({
                        ...json,
                        results: [...prevData.results, ...json.results]
                    }));
                }
            })
            .catch(err => console.error(err));
    }, [pageNumber]);
    return (
        <div className="movie-list">
            <LoadButton inc={loadMore} />
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
