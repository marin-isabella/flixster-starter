import React from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';
import LoadButton from './LoadButton.jsx';

const MovieList = ({ movies, loadMore, isSorted, onMovieSelect }) => {
    return (
        <div className="movie-list">
            {/** Checks for when no movies to show if you keep pressing load more: */}
            {movies.length === 0 ? (
                <div className="no-movies">No movies to show</div>
            ) : (
                movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} image={movie.poster_path} title={movie.original_title} rating={movie.vote_average} runtime={movie.runtime} onClick={() => onMovieSelect(movie)}/>
                ))
            )}
            <LoadButton inc={loadMore} disabled={isSorted} />
        </div>
    );
}
export default MovieList;
