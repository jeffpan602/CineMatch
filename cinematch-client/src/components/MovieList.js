import React from 'react'
import { MovieCard } from './MovieCard'

const MovieList = ({movies, openPopup}) => {
  return (
    <div className="movie-list" style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {movies && movies.map(movie => (
            <div key={movie.id} className="movie">
                <MovieCard movie={movie} openPopup={openPopup}/>
                <div className='overlay'></div>
            </div>
        ))}
    </div>
  )
}

export default MovieList;
