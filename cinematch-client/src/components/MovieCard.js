import React from 'react'

export const MovieCard = ({movie, openPopup}) => {
  return (
    <div className='movie-card' onClick={() => openPopup(movie)}>
        <div className='poster'>
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}/>
            ) : (
                <div className="empty-poster"></div>
            )}
            <div className="movie-info">
                <h2>{movie.title}</h2>
                {movie.release_date ? (
                    <p>{new Date(movie.release_date).getFullYear()}</p>
                ) : (
                    <p>{'Unknown Year'}</p>
                )}
            </div>
        </div>
    </div>
  )
}
