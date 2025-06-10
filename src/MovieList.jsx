import React from 'react';
import data from './data/data.js';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';

const MovieList = () => {
    return (
        <div className="movie-list">
            {
                data.results.map(movie => {
                    return (
                        <MovieCard key={movie.id} image={movie.poster_path} title={movie.title} rating={movie.vote_average}/>
                    )
                })
            }
        </div>
    )
}

export default MovieList;
