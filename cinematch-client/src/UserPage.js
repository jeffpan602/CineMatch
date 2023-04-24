import './styles.css';
import './UserPage.css';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col
} from 'react-bootstrap';
import CineMatchNavBar from './CineMatchNavBar';
import axios from 'axios';

function UserPage() {
  const [movies, setMovies] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([])

  const handleWatchedDelete = (movieId) => {
    axios.delete(`http://127.0.0.1:8000/api/watched/${movieId}/`)
      .then(response => {
        setWatched(watched.filter(movie => movie.movie_id !== movieId));
      })
      .catch(err => console.log(err));
  };

  const handleToWatchDelete = (movieId) => {
    axios.delete(`http://127.0.0.1:8000/api/to_watch/${movieId}/`)
      .then(response => {
        setToWatch(toWatch.filter(movie => movie.movie_id !== movieId));
      })
      .catch(err => console.log(err));
  };

  // Retrieves watched and to-watch lists from databse
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/watched/')
      .then(response => {
        setWatched(response.data);
      })
      .catch(err => console.log(err));
    axios.get('http://127.0.0.1:8000/api/to_watch/')
      .then(response => {
        setToWatch(response.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="userpage">
      <CineMatchNavBar setMovies={setMovies} />
      <span className="titleSpan">
        <h1>User Page</h1>
      </span>

      <Row style={{ marginTop: "1.2em", padding: "0em 0.9em" }}>
        <Col md={6}>
          <span style={{ display: "flex", justifyContent: "center" }}><h4>To-Watch List</h4></span>
          <br />

          {/* Displays users to-watch list stored on database */}
          {(toWatch.length === 0) ? <h3 style={{ textAlign: "center" }}>No Movies in To-Watch List</h3> :
            <Table size="sm" striped >
              <thead>
                <tr>
                  <th>Movie</th>
                  <th style={{ textAlign: 'center' }}>Completed</th>
                </tr>
              </thead>
              <tbody>
                {toWatch.map((element) =>
                  <tr key={element.movie_id}>
                    <td style={{ color: 'white'}}>{element.movie_title}</td>
                    <td style={{ color: 'white', textAlign: 'center' }}>{(element.completed) ? "YES" : "NO"}</td>
                    <td>
                      <button onClick={() => handleToWatchDelete(element.movie_id)}>Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          }
        </Col>
        <Col md={6}>
          <span style={{ display: "flex", justifyContent: "center" }}><h4>Watched List</h4></span>
          <br />

          {/* Displays users to-watch list stored on database */}
          {(watched.length === 0) ? <h3 style={{ textAlign: "center" }}>No Movies in Watched List</h3> :
            <Table size="sm" striped>
              <thead>
                <tr>
                  <th>Movie</th>
                  <th style={{ textAlign: 'center' }}>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {watched.map((element) =>
                  <tr key={element.movie_id}>
                    <td style={{ color: 'white' }}>{element.movie_title}</td>
                    <td style={{ color: 'white', textAlign: 'center' }}>{element.rating}/10</td>
                    <td style={{ color: 'white' }}>{element.review}</td>
                    <td>
                      <button onClick={() => handleWatchedDelete(element.movie_id)}>Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          }
        </Col>
      </Row>
    </div>
  );
}

export default UserPage;