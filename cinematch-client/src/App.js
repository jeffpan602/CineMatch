import './App.css'
import React from 'react';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import { MoviePopup } from './components/MoviePopup';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "b5d2f69cf0491ce4441c4d04c4befc3d";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      toWatch: [],
      watched: [],
      selected: {},
      searching: false
    };
    this.fetchMovies = this.fetchMovies.bind(this);

    this.addToWatchList = this.addToWatchList.bind(this);
    this.addToWatchedList = this.addToWatchedList.bind(this);

    this.openMovie = this.openMovie.bind(this);
    this.closeMovie = this.closeMovie.bind(this);
  }

  fetchMovies(searchQuery) {
    this.setState({searching : true});

    const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // returns results sorted by popularity score
        // filtering out anything with no ratings to counteract random crap
        this.setState({ movies: data.results.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1).filter(movie => movie.vote_count > 0 || movie.vote_average === 0) });
      })
      .catch(error => {
        console.error(error);
      });
  }

  trendingMovies() {
    const url = `${API_URL}/trending/movie/week?api_key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({movies : data.results});
      })
      .catch(error => {
        console.error(error);
      });
  }

  addToWatchList(movie) {
    if(!this.state.toWatch.includes(movie)) {
      const newToWatch = [ ...this.state.toWatch, movie];
      this.setState({toWatch: newToWatch}, () => {console.log(this.state.toWatch)});
    }
  }

  addToWatchedList(movie) {
    if(!this.state.watched.includes(movie)) {
      const newWatched = [ ...this.state.watched, movie];
      this.setState({watched: newWatched}, () => {console.log(this.state.watched)})
    }
  }

  openMovie(movie) {
    this.setState({selected: movie}, () => {console.log(this.state.selected.title)})
    console.log(movie.vote_average);
  }

  closeMovie() {
    this.setState({selected: {}}, () => {console.log(this.state.selected)})
  }

  render() {
    if(this.state.searching === false) {
      this.trendingMovies();
    }

    const { movies } = this.state;
    

    return (
        <div className="App">
            <main>
                <NavBar onSearch={this.fetchMovies}/>

                <MovieList movies={movies} openPopup={this.openMovie}/>
                {(typeof this.state.selected.title != "undefined") ? 
                  <MoviePopup movie={this.state.selected} 
                              close={this.closeMovie} 
                              toWatch={this.addToWatchList}
                              watched={this.addToWatchedList}/> : false}
            </main>
        </div>
    );
  }
}

export default App;
