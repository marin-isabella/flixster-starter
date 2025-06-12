import React, { useState } from 'react';
import './MovieCard.css';
import Favorite from '../FavoriteButton/Favorite.jsx';

const MovieCard = (props) => {
    const { image, title, rating, onClick } = props;
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };
    // Reference for base url: https://developer.themoviedb.org/docs/image-basics
    const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;

    return (
        <div className="movie-card" onClick={onClick}>
            <div className="movie-image">
                <img src={imageUrl} alt={`Movie poster for ${title}`}/>

            </div>
            <div className="movie-info">
                <h2 className="movie-title">{title}</h2>
                <h3 className="movie-rating">Rating: {rating}</h3>
            </div>

            <div className="like-button">
                <Favorite liked={isLiked} onClick={toggleLike} />
            </div>
        </div>
    )
}

export default MovieCard;
