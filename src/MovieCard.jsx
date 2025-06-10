import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    const { image, title, rating } = props;
    const imageUrl = "https://picsum.photos/200/300";

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={imageUrl}/>
            </div>
            <div className="movie-info">
                <h2 className="movie-title">{title}</h2>
                <h3 className="movie-rating">Rating: {rating}</h3>
            </div>
        </div>
    )
}

export default MovieCard;
