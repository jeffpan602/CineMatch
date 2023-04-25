import { React, useState } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, Navigate, createSearchParams, redirect, useNavigate } from 'react-router-dom';

const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&query";

export default function CineMatchNavBar(props) {
  const {
    setMovies,
  } = props;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const params = [query];

  const searchMovie = async (e) => {
    console.log(`Got query "${query}" from NavBar`);
    if(query != "") navigate(`/results?query=${query}`);
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/home" style={{ fontSize: "1.2em", textDecoration: 'none', color: 'white' }}>CineMatch</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>Trending</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/user" style={{ textDecoration: 'none', color: 'white' }}>User Page</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/recommended" style={{ textDecoration: 'none', color: 'white'}}>Recommended</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/stats" style={{ textDecoration: 'none', color: 'white' }}>Stats</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

        <Navbar.Collapse id="nabarScroll">
          <Nav
            className="me-auto my-2 my-lg-3"
            style={{ maxHeight: '100px' }}
            navbarScroll></Nav>

          <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
            <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
            <Button variant="secondary" onClick={searchMovie}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}