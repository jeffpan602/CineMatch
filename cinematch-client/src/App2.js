import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import CineMatch from './CineMatch';
import 'bootstrap/dist/css/bootstrap.min.css';
import CineMatchNavBar from './CineMatchNavBar'
import axios from "axios";



const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";

function App() {

  const [movies, setMovies] = useState([]);
  const [inWatchedList, setInWatchedList] = useState(false);
  const navigate = useNavigate();
  
  const addToMovies = (id) => {
    const tmp_URL = "https://api.themoviedb.org/3/movie/"+ id.toString() +"/recommendations?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&language=en-US&page=1"
    //console.log(tmp_URL);
    fetch(tmp_URL)
      .then((res) => res.json())
      .then(data => {
        const fiveRec = data.results.slice(0,5);
        console.log(movies.concat(fiveRec));
        setMovies(prevMovies => prevMovies.concat(fiveRec));

        
      })
      .catch((e) => console.log(e)); 
  }


  useEffect(() => {
    // Retrieves trending movies to display on homepage
    

      axios.get(`http://127.0.0.1:8000/api/watched/`)
      .then(response => {
        const mov = response.data;
        console.log(response.data);
        for (let i = 0; i < mov.length; i++) {
          addToMovies(mov[i].movie_id)
          
          //console.log(movies);
        }
      })
      .catch(error => {
        console.log(error);
      });
      
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