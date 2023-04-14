import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import CineMatch from './CineMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import CineMatchNavBar from './CineMatchNavBar'

const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";

function App() {

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieves trending movies to display on homepage
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch((e) => console.log(e));

      
    // Redirect to /home when accessing the default route (/)
    if (window.location.pathname === '/') {
      navigate('/home');
    }
  }, [navigate])

  return (
    <>
      <CineMatchNavBar setMovies={setMovies}/>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) =>
                <CineMatch key={movieReq.id} {...movieReq} />
                )}
            </div>
          </div>
        ) : (
          <h2>Sorry, no movies were found!</h2>
        )}
      </div>
    </>

  );
}

export default App;