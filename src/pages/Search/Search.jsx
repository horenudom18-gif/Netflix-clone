import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import '../Home/Home.css'

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQyYzBiM2JmOTJmNDcyMzE2NWNiYTNkMDYyMDBkOCIsIm5iZiI6MTc4NjM3MTI0OC45NDUsInN1YiI6IjZhNzlkY2IwNThkYjZjNTI3NzQ5ZDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul71UjI4wW1muUewu8ciWMKQwGt8RiUh57dqCtJON4s'

const Search = () => {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&language=en-US&page=1`, {
      headers: { accept: 'application/json', Authorization: `Bearer ${BEARER_TOKEN}` },
    })
      .then((res) => res.json())
      .then((res) => setResults(res.results || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [q])

  return (
    <div className='home'>
      <Navbar/>
      <div className="more-cards page-content" style={{ minHeight: '40vh' }}>
        {loading ? (
          <p style={{ padding: '0 4%' }}>Searching…</p>
        ) : (
          <MediaRow title={`Results for "${q}"`} items={results} mediaType="movie" />
        )}
        {!loading && results.length === 0 && (
          <p style={{ padding: '0 4%' }}>No matches for "{q}".</p>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default Search
