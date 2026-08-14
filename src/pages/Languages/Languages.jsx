import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import { LANGUAGES, discoverMoviesByLanguage } from '../../api/tmdb'
import '../Home/Home.css'
import '../Movies/Movies.css'

const Languages = () => {
  const [lang, setLang] = useState('en')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    discoverMoviesByLanguage(lang).then((res) => setMovies(res.results)).catch(console.error)
  }, [lang])

  const activeLabel = LANGUAGES.find((l) => l.code === lang)?.label || 'Movies'

  return (
    <div className='home'>
      <Navbar/>
      <div className="genre-page-content" style={{ padding: '0 4%' }}>
        <div className="genre-tabs">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`genre-tab ${lang === l.code ? 'is-active' : ''}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <MediaRow title={`${activeLabel} Movies`} items={movies} mediaType="movie" />
      </div>
      <Footer/>
    </div>
  )
}

export default Languages
