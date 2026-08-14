import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import { getMovieGenres, discoverMoviesByGenre } from '../../api/tmdb'
import '../Home/Home.css'
import './Movies.css'

const Movies = () => {
  const [genres, setGenres] = useState([])
  const [activeGenre, setActiveGenre] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovieGenres().then((res) => {
      setGenres(res.genres)
      if (res.genres.length) setActiveGenre(res.genres[0].id)
    })
  }, [])

  useEffect(() => {
    if (!activeGenre) return
    discoverMoviesByGenre(activeGenre).then((res) => setMovies(res.results))
  }, [activeGenre])

  const activeGenreName = genres.find((g) => g.id === activeGenre)?.name || 'Movies'

  return (
    <div className='home'>
      <Navbar/>
      <div className="genre-page-content" style={{ padding: '0 4%' }}>
        <div className="genre-tabs">
          {genres.map((g) => (
            <button
              key={g.id}
              className={`genre-tab ${activeGenre === g.id ? 'is-active' : ''}`}
              onClick={() => setActiveGenre(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
        <MediaRow title={activeGenreName} items={movies} mediaType="movie" />
      </div>
      <Footer/>
    </div>
  )
}

export default Movies
