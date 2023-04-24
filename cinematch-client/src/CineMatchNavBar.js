import { React, useState } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const API_URL = "https://api.themoviedb.org/3/trending/movie/week?api_key=b5d2f69cf0491ce4441c4d04c4befc3d";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&query";

export default function CineMatchNavBar(props) {
  const {
    setMovies,
  } = props;
  const [query, setQuery] = useState('');

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (

      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand role="toHome">
            <a href="/" style={{ fontSize: "1.2em", textDecoration: 'none', color: 'white' }}>CineMatch</a>
          </Navbar.Brand>
          <Navbar.Brand role="toTrending">
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>Trending</a>
          </Navbar.Brand>
          <Navbar.Brand role="toUser">
            <a href="/user" style={{ textDecoration: 'none', color: 'white' }}>User Page</a>
          </Navbar.Brand>
          <Navbar.Brand role="toStats">
            <a href="/stats" style={{ textDecoration: 'none', color: 'white' }}>Stats</a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off" role="searchArea">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" onClick={searchMovie} role="searchBtn">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}