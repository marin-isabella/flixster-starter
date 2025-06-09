import './App.css';
import Header from './Header.jsx';
import MovieCard from './MovieCard.jsx';
import SearchForm from './SearchForm.jsx';
import data from './data/data.js';

function App() {
  const movieCardElements = [{title: "Mamma Mia", rating: "10"}, {title: "Pitch Perfect", rating: "8"}, {title: "Avengers", rating: "10"}];

  return (
    <>
      <Header />
      <SearchForm />
      {<div className="movie-card-section">
        {movieCardElements.map((movieCard) => {
          return <MovieCard title={movieCard.title} rating={movieCard.rating}/>
        })}
      </div>}
    </>
  )
}

export default App
