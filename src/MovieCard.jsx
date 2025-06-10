import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    const { image, title, rating } = props;
    // Reference for base url: https://developer.themoviedb.org/docs/image-basics
    const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{title}</h2>
                <h3 className="movie-rating">Rating: {rating}</h3>
            </div>
        </div>
    )
}

export default MovieCard;
