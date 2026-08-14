import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import { useWatchlist } from '../../hooks/useWatchlist'
import '../Home/Home.css'

const MyList = () => {
  const { items, loading } = useWatchlist()
  const movies = items.filter((i) => i.media_type !== 'tv')
  const tv = items.filter((i) => i.media_type === 'tv')

  return (
    <div className='home'>
      <Navbar/>
      <div className="more-cards page-content" style={{ minHeight: '40vh' }}>
        {loading ? (
          <p style={{ padding: '0 4%' }}>Loading…</p>
        ) : items.length === 0 ? (
          <p style={{ padding: '0 4%' }}>Nothing saved yet — hit "+ My List" on any movie or show.</p>
        ) : (
          <>
            <MediaRow title="Movies" items={movies} mediaType="movie" />
            <MediaRow title="TV Shows" items={tv} mediaType="tv" />
          </>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default MyList
