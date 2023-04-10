import { Modal, show, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const API_IMG = "https://image.tmdb.org/t/p/w500/";
const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = "b5d2f69cf0491ce4441c4d04c4befc3d";

const CineMatch = ({ title, poster_path, vote_average, release_date, overview, id }) => {

  const [show, setShow] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
        const data = await res.json();
        const credits = data.credits;

        // Get directors
        const directors = credits.crew
            .filter((person) => person.job === "Director")
            .map((person) => person.name);
        setDirector(directors);

        // Get top 5 cast members
        const cast = credits.cast.slice(0, 5).map((person) => person.name);
        setCast(cast);
      } catch (e) {
        console.log(e);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <div className="card text-center bg-secondary mb-3">
      <div className="card-body">
        <img className="card-img-top" src={API_IMG + poster_path} />
        <div className="card-body">
          <button type="button" className="btn btn-dark" onClick={handleShow}>View More</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img className="card-img-top" style={{ width: '14rem' }} src={API_IMG + poster_path} />
              <h3>{title}</h3>
              <strong>Release Date: </strong>{release_date}
              <br></br>
              <br></br>
              <strong>IMDb: </strong>{vote_average}
              <br></br>
              <br></br>
              {director.length > 0 &&
                <div>
                    <strong>Director(s):</strong>
                    <ul>
                        {director.map((person) => <li key={person}>{person}</li>)}
                    </ul>
                </div>
              }
              {cast.length > 0 &&
                <div>
                  <strong>Cast:</strong>
                  <ul>
                    {cast.map((person) => <li key={person}>{person}</li>)}
                  </ul>
                </div>
              }
              <strong>Overview:</strong>
              <p>{overview}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default CineMatch;