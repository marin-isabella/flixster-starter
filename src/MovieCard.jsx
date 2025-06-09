import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <img src="https://picsum.photos/200/300"/>
            <h1>{props.title}</h1>
            <h2>Rating: {props.rating}</h2>
        </div>
    )
}

export default MovieCard;
