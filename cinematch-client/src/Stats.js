import './styles.css'
import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col
} from 'react-bootstrap';
import CineMatchNavBar from './CineMatchNavBar';
import axios from 'axios';

function Stats() { 
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]) 

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/watched/')
        .then(response => {
          setWatched(response.data);
        }).catch(err => console.log(err));
    }, [])

    return (
        <>
            <CineMatchNavBar setMovies = {setMovies} />

            <span ClassName = "titleSpan" >
                <h1>Stats</h1>
                </span>
        </>
    )
}

export default Stats;