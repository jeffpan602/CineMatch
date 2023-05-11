import { React, useState } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import "./styles.css";

export default function CineMatchNavBar(props) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchMovie = async (e) => {
    if(query !== "") navigate(`/results?query=${query}`);
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <Navbar expand="lg" variant="dark" sticky="top">
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
        <Navbar.Brand role="toRecommended">
          <a href="/recommended" style={{ textDecoration: 'none', color: 'white'}}>Recommended</a>
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

          <Form className="d-flex" onSubmit={searchMovie} autoComplete="off" role="search">
            <FormControl
              role="searchInput"
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