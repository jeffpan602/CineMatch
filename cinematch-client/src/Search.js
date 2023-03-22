import './Search.css'
import React from 'react';
import CineMatchNavBar from './CineMatchNavBar';
import MovieList from './components/MovieList';
import { MoviePopup } from './components/MoviePopup';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selected: {}
    };
    this.fetchMovies = this.fetchMovies.bind(this);
    this.openMovie = this.openMovie.bind(this);
    this.closeMovie = this.closeMovie.bind(this);
  }

  fetchMovies(searchQuery) {
    const apiKey = "b5d2f69cf0491ce4441c4d04c4befc3d";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        /*returns results sorted by popularity score*/
        this.setState({ movies: data.results.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1) });
      })
      .catch(error => {
        console.error(error);
      });
  }

  openMovie(movie) {
    this.setState({selected: movie}, () => {console.log(this.state.selected.title)})
  }

  closeMovie() {
    this.setState({selected: {}}, () => {console.log(this.state.selected)})
  }

  render() {
    const { movies } = this.state;
    return (
        <div className="Search">
            <main>
                {/*<h1>CineMatch</h1>*/}
                <CineMatchNavBar onSearch={this.fetchMovies}/>
                {/*Return JSX containing individual movie results*/}
                <MovieList movies={movies} openPopup={this.openMovie}/>
                {(typeof this.state.selected.title != "undefined") ? <MoviePopup movie={this.state.selected} close={this.closeMovie} /> : false}
            </main>
        </div>
    );
  }
}

export default Search;
