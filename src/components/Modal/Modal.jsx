import React from 'react';
import './Modal.css';

const Modal = ({ movie, genres, onClose, movieRuntime, movieTrailer }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

    // map genre IDs to genre names
    const movieGenres = movie.genre_ids
        .map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return genre ? genre.name : null;
        })
        .filter(Boolean)
        .join(', ');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <div className="movie-info">
                    <h2 className="movie-title">{movie.title}</h2>
                    <div className="modal-flex-container">
                        <img className="movie-image" src={imageUrl} alt={`Movie poster for ${movie.title}`}/>
                        <div className="movie-inner-info">
                            <p className="movie-release-date"><strong>Release Date:</strong> {movie.release_date}</p>
                            <p className="movie-overview"><strong>Overview:</strong> {movie.overview}</p>
                            <p className="movie-genres"><strong>Genres:</strong> {movieGenres}</p>
                            <p className="movie-rating"><strong>Rating:</strong> {movie.vote_average} / 10</p>
                            {movieRuntime && <p className="movie-runtime"><strong>Runtime:</strong> {movieRuntime} minutes</p>}
                        </div>
                    </div>

                    <div className="trailer-flex-container">
                        {movieTrailer ? (
                            <div className="movie-trailer">
                                <h3 className="trailer-title">Trailer</h3>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${movieTrailer}`}
                                    title={`${movie.title} trailer`}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className="movie-trailer"><strong>Trailer:</strong> No trailer available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
