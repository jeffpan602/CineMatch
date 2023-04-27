import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CineMatchNavBar from './CineMatchNavBar'
import  MovieCard  from './components/MovieCard';

function SearchPage() {

  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    console.log(`Searching for "${query}"`);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&query=${query}`;
      fetch(url)
      .then(res => res.json())
      .then(data => 
        setMovies(data.results.filter(movie => movie.vote_count > 0 || movie.vote_average === 0).sort((a, b) => (a.popularity < b.popularity) ? 1 : -1))
        )     
    }
    catch (e) {
      console.log(e);
    }
  }, [query])

  return (
    <>
      <div className="app">
        <CineMatchNavBar/>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) =>
                <MovieCard key={movieReq.id} {...movieReq}/>
                )}
            </div>
          </div>
        ) : (
          <div className="loading">
            <h2>Sorry, no movies were found!</h2>
          </div>
        )}
      </div>
    </>

  );
}

export default SearchPage;