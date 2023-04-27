import React, { useState, useEffect } from 'react';
import './App.css';
import CineMatch from './CineMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import CineMatchNavBar from './CineMatchNavBar'
import  MovieCard  from './components/MovieCard';

const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Retrieves trending movies to display on homepage
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch((e) => console.log(e));
  }, [])

  return (
    <>
      <div className="app">
        <CineMatchNavBar />
        <div role="movie-grid">
          {movies.length > 0 ? (
            <div className="container">
              <div className="grid">
                {movies.map((movieReq) =>
                  //<CineMatch key={movieReq.id} {...movieReq} />
                  <MovieCard key={movieReq.id} {...movieReq} />
                )}
              </div>
            </div>
          ) : (
            <div className="loading">
              <h2>Sorry, no movies were found!</h2>
            </div>
          )}
        </div>
      </div>
    </>

  );
}

export default App;