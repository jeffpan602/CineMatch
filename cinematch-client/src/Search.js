import './Search.css'
import React from 'react';
import CineMatchNavBar from './CineMatchNavBar';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  fetchMovies(searchQuery) {
    const apiKey = "b5d2f69cf0491ce4441c4d04c4befc3d";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data.results });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { movies } = this.state;
    return (
        <div className="Search">
            <header>
                {/*<h1>CineMatch</h1>*/}
                <CineMatchNavBar onSearch={this.fetchMovies}/>
                {/*Return JSX containing individual movie results*/}
                <div className="movie-list" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                    {movies && 
                        movies.filter(movie => movie.poster_path)
                              .map(movie => (
                                <div key={movie.id} className="movie">
                                    <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
                                    <div className="movie-info">
                                        <h2>{movie.title}</h2>
                                        <p>{new Date(movie.release_date).getFullYear()}</p>
                                    </div>
                                </div>
                    ))}
                </div>
            </header>
        </div>
    );
  }
}

export default Search;
