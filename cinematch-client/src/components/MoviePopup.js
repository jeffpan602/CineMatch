import React from 'react'

export const MoviePopup = ({movie, close, toWatch, watched}) => {
  return (
    <div className='popup'>
        <div className='content'>
            <h2>{movie.title} 
                <span>{movie.release_date ? (
                        <p>{new Date(movie.release_date).getFullYear()}</p>
                    ) : (
                        <p>{'Unknown Year'}</p>
                    )}
                </span>
            </h2>
            <p className="rating">Rating: {movie.vote_average} </p>
            <div className="stuff">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}/>
                ) : (
                    <div className="empty-poster"/>
                )}
            </div>
            <button className="close" onClick={close}>Close</button>
            <button className="add" onClick={() => toWatch(movie)}>Add to Watchlist</button>
            <button classname="add" onClick={() => watched(movie)}>Watched</button>
        </div>
    </div>
  )
}
