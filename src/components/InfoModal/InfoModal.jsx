import React, { useEffect, useState } from 'react'
import './InfoModal.css'

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQyYzBiM2JmOTJmNDcyMzE2NWNiYTNkMDYyMDBkOCIsIm5iZiI6MTc4NjM3MTI0OC45NDUsInN1YiI6IjZhNzlkY2IwNThkYjZjNTI3NzQ5ZDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul71UjI4wW1muUewu8ciWMKQwGt8RiUh57dqCtJON4s'

const InfoModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: { accept: 'application/json', Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((res) => res.json())
      .then(setMovie)
      .catch(console.error)
  }, [movieId])

  if (!movie) return null

  return (
    <div className="info-modal-backdrop" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose}>✕</button>
        {movie.backdrop_path && (
          <img
            className="info-modal-backdrop-img"
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt=""
          />
        )}
        <div className="info-modal-body">
          <h2>{movie.title}</h2>
          <p className="info-modal-meta">
            {movie.release_date?.slice(0, 4)} · {movie.runtime} min · ★ {movie.vote_average?.toFixed(1)}
          </p>
          <p className="info-modal-genres">{movie.genres?.map((g) => g.name).join(' · ')}</p>
          <p className="info-modal-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
