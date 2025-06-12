import React from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieList.css';
import LoadButton from '../LoadMore/LoadButton.jsx';

const MovieList = ({ movies, loadMore, onMovieSelect }) => {
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
            <LoadButton inc={loadMore}/>
        </div>
    );
}
export default MovieList;
