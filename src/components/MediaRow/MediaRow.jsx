import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IMG_BASE } from '../../api/tmdb'
import { useAuth } from '../../context/AuthContext'
import { useWatchlist } from '../../hooks/useWatchlist'
import '../TitleCards/TitleCards.css'
import './MediaRow.css'

const MediaRow = ({ title, items, mediaType = 'movie' }) => {
  const cardsRef = useRef()
  const { user } = useAuth()
  const { isSaved, toggleWatchlist } = useWatchlist()

  function scrollRow(direction) {
    const el = cardsRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (!items || items.length === 0) return null

  return (
    <div className='titel-cards'>
      <h2>{title}</h2>
      <div className="card-list-wrap">
        <button className="row-arrow row-arrow--left" onClick={() => scrollRow(-1)} aria-label="Scroll left">‹</button>
        <div className="card-list" ref={cardsRef}>
          {items.map((item) => (
            <div className="card" key={item.id}>
              <Link to={mediaType === 'tv' ? `/tv/${item.id}` : `/player/${item.id}`} className="card-media">
                <img
                  src={item.poster_path ? `${IMG_BASE}${item.poster_path}` : ''}
                  alt=""
                />
                <p>{item.title || item.name}</p>
              </Link>
              {user && (
                <button
                  className={`mylist-btn ${isSaved(item.id) ? 'is-saved' : ''}`}
                  onClick={() => toggleWatchlist(item, mediaType)}
                >
                  {isSaved(item.id) ? '✓ My List' : '+ My List'}
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="row-arrow row-arrow--right" onClick={() => scrollRow(1)} aria-label="Scroll right">›</button>
      </div>
    </div>
  )
}

export default MediaRow
