import {
  Modal, show, Button, Form, FormControl,
  ModalHeader, ModalTitle, ModalBody, Row, Image,
  Col, ModalFooter, FormGroup, FormLabel
} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment"
import FormRange from 'react-bootstrap/esm/FormRange';

const API_IMG = "https://image.tmdb.org/t/p/w500/";
const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = "b5d2f69cf0491ce4441c4d04c4befc3d";

export const MovieCard = ({ title, poster_path, vote_average, release_date, overview, id }) => {

  const [show, setShow] = useState(false);
  const [towatch_show, setToWatchShow] = useState(false);
  const [watched_show, setWatchedShow] = useState(false);
  const [in_towatch, setInToWatch] = useState(false);
  const [in_watched, setInWatched] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);

  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState('');

  const handleShow = (id) => { setShow(true); movieInToWatchList(id); movieInWatchedList(id) }
  const handleClose = () => setShow(false);
  const handleToWatchShow = () => { setToWatchShow(true); setShow(false); };
  const handleToWatchClose = () => setToWatchShow(false);
  const handleWatchedShow = () => {
    setWatchedShow(true);
    setShow(false);
    setUserRating(5);
    setUserReview('');
  };
  const handleWatchedClose = () => setWatchedShow(false);


  // function to check if movie is in the to-watch list
  const movieInToWatchList = ({ id }) => {
    axios.get(`http://127.0.0.1:8000/api/to_watch/`)
      .then(response => {
        const mov = response.data;
        setInToWatch(false);
        for (let i = 0; i < mov.length; i++) {
          if (mov[i].movie_id === id) {
            setInToWatch(true);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // function to check if movie is in the watched list
  const movieInWatchedList = ({ id }) => {
    axios.get(`http://127.0.0.1:8000/api/watched/`)
      .then(response => {
        const mov = response.data;
        setInWatched(false);
        for (let i = 0; i < mov.length; i++) {
          if (mov[i].movie_id === id) {
            setInWatched(true);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // function to add the movie id to the to-watch list table
  const addToToWatchList = ({ id }) => {
    setToWatchShow(false);

    const movieData = {
      movie_id: id,
      movie_title: title,
      completed: false,
    }

    axios.post(`http://127.0.0.1:8000/api/to_watch/`, movieData).then(response => {
      console.log(response.data);
    })
      .catch(error => {
        console.log(error);
        console.log(movieData)
      });


    setUserRating(5);
    setUserReview('');
  };


  // remove from the to-watch list
  const removeFromToWatchList = ({ id }) => {
    setToWatchShow(false);
    setShow(false);


    axios.delete(`http://127.0.0.1:8000/api/to_watch/${id}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };




  // function to add the movie info to the watched list table
  const addToWatchedList = ({ id }, userRating, userReview) => {
    setWatchedShow(false);

    const movieData = {
      movie_id: id,
      movie_title: title,
      rating: userRating,
      review: userReview
    };
    console.log(movieData);
    axios.post(`http://127.0.0.1:8000/api/watched/`, movieData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // remove from watched list
  const removeFromWatchedList = ({ id }) => {
    setToWatchShow(false);
    setShow(false);

    axios.delete(`http://127.0.0.1:8000/api/watched/${id}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    <div className = 'movie-card'>
        <div className ='movie-card-body' onClick={() => handleShow({ id })}>
            <div className='poster'>
                {poster_path ? (
                    <img src={`${API_IMG}${poster_path}`}
                    alt={`${title} Poster`}/>
                ) : (
                    <div className="empty-poster">
                      <p>No Image Available</p>
                    </div>
                )}
            </div>
            <div className="movie-card-info">
                <h2>{title}</h2>
                {release_date ? (
                    <p>{moment(release_date).format("YYYY")}</p>
                ) : (
                    <p>{'Unknown Year'}</p>
                )}
            </div>
        </div>
        <Modal
                className='modal-card'
                show={show}
                onHide={handleClose}
                size="lg"
                animation={true}
                centered>
                <ModalHeader closeButton>
                <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                <Row>
                    <Col md={4}>
                        <div className='poster'>
                            {poster_path ? (
                                <Image src={`https://image.tmdb.org/t/p/w200${poster_path}`} fluid
                                alt={`${title} Poster`}/>
                            ) : (
                                <div className="empty-poster"></div>
                            )}
                        </div>
                    </Col>
                    <Col md={8}>
                    {release_date ? ( 
                        <p><strong>Release Date: {moment(release_date).format("MMMM Do, YYYY")}</strong></p>
                    ) : (
                        <p><strong>Unknown Release Date</strong></p>
                    )}
                    <p>{overview}</p>
                    <Row>
                        <Col md={6}>
                        <strong>Director(s): </strong>
                        <ul>
                            {director.map((person) => <li key={person}>{person}</li>)}
                        </ul>
                        </Col>
                        <Col md={6}>
                        <strong>Cast:</strong>
                        <ul>
                            {cast.map((person) => <li key={person}>{person}</li>)}
                        </ul>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                </ModalBody>
                <ModalFooter>
                {in_watched ?
                    <Button variant="dark" onClick={() => removeFromWatchedList({ id })}>Remove from Watched List</Button> :
                    <Button variant="dark" onClick={handleWatchedShow}>Add to Watched List</Button>}
                {in_towatch ?
                    <Button variant="dark" onClick={() => removeFromToWatchList({ id })}>Remove from To-Watch List</Button> :
                    <Button variant="dark" onClick={handleToWatchShow}>Add to To-Watch List</Button>}
                <Button variant="danger" onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
            <Modal
                show={towatch_show}
                onHide={handleToWatchClose}
                centered>
                <ModalBody>
                <h3>Add <strong>{title}</strong> to To-Watch list?</h3>
                <br />
                <br />
                </ModalBody>
                <ModalFooter>
                <Button variant="success" onClick={() => addToToWatchList({ id })}>Add to To-Watch List</Button>
                <Button variant="danger" onClick={handleToWatchClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal
                show={watched_show}
                onHide={handleWatchedClose}
                centered>
                <ModalBody>
                <h3>Add <strong>{title}</strong> to Watched list?</h3>
                <br />
                <br />
                <Form>
                    <FormGroup>
                    <FormLabel><h6>My Rating: {userRating}</h6></FormLabel>
                    <FormRange
                        min={1}
                        max={10}
                        value={userRating}
                        step={1}
                        onChange={(e) => setUserRating(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup>
                    <FormLabel><h6>My Review:</h6></FormLabel>
                    <FormControl
                        type="textarea"
                        name={userReview}
                        value={userReview} onChange={(e) => setUserReview(e.target.value)} autoComplete="off"
                        style={{ backgroundColor: "#f1faee" }}
                    />
                    </FormGroup>
                </Form>
                </ModalBody>
                <Modal.Footer>
                <Button variant="success" onClick={() => addToWatchedList({ id }, userRating, userReview)}>Add to Watched List</Button>
                <Button variant="danger" onClick={handleWatchedClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        
    </div>
  )
}