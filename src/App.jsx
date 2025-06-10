import './App.css';
import Header from './Header.jsx';
import SearchForm from './SearchForm.jsx';
import data from './data/data.js';
import MovieList from './MovieList.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <SearchForm />
      <main className = "main">
        <MovieList data={data} />
      </main>
      <Footer />
    </>
  )
}

export default App
