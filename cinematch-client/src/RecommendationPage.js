import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CineMatchNavBar from './CineMatchNavBar'
import axios from "axios";
import { MovieCard } from './components/MovieCard';


const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";

function RecommendationPage() {

  const [movies, setMovies] = useState([]);
  const [inWatchedList, setInWatchedList] = useState(false);
  const navigate = useNavigate();
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  const addToMovies = (id, num2add) => {
    const tmp_URL = "https://api.themoviedb.org/3/movie/"+ id.toString() +"/recommendations?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&language=en-US&page=1"
    
    fetch(tmp_URL)
      .then((res) => res.json())
      .then(data => {
        const movRec = data.results.slice(0,num2add);
        setMovies(prevMovies => shuffle(prevMovies.concat(movRec)));
        
        
      })
      .catch((e) => console.log(e)); 
  }


  useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/watched/`)
      .then(response => {
        const mov = response.data;
        const filteredMov = mov.filter(movie => movie.rating > 5);
        let randNum = 0;
        let movAdded = 0;
        while (movAdded < 20) {
          if (filteredMov.length === 0) {
            console.log("broken");
            break;
          } else if (filteredMov.length == 1) {
            randNum = Math.floor(Math.random() * filteredMov.length);
            const num2add = 20 - movAdded;
            movAdded = movAdded + num2add;
            addToMovies(filteredMov[randNum].movie_id, num2add);
            filteredMov.splice(randNum, 1);
          } else {
            randNum = Math.floor(Math.random() * filteredMov.length);
            const num2add = 5;
            movAdded = movAdded+5;
            addToMovies(filteredMov[randNum].movie_id, num2add);
            filteredMov.splice(randNum, 1);
          }
        }
        /*
        setMovies(prevMovies => {console.log(prevMovies);
          const shuffledMovies = shuffle(prevMovies);
          console.log(shuffledMovies);
          return shuffledMovies;});
          */
      })
      .catch(error => {
        console.log(error);
      });
  }, [navigate])
  
  return (
    <>
      <CineMatchNavBar setMovies={setMovies}/>
      <div className='app'>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) =>
                <MovieCard key={movieReq.id} {...movieReq} />
                )}
            </div>
          </div>
        ) : (
          <div className='loading'>
            <h2>Start rating movies to get recommendations!</h2>
          </div>
        )}
      </div>
    </>

  );
}

export default RecommendationPage;