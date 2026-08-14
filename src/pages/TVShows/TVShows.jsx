import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import { getTrendingTV, getPopularTV, getTopRatedTV, getOnTheAirTV } from '../../api/tmdb'
import '../Home/Home.css'

const TVShows = () => {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [onAir, setOnAir] = useState([])

  useEffect(() => {
    getTrendingTV().then((res) => setTrending(res.results)).catch(console.error)
    getPopularTV().then((res) => setPopular(res.results)).catch(console.error)
    getTopRatedTV().then((res) => setTopRated(res.results)).catch(console.error)
    getOnTheAirTV().then((res) => setOnAir(res.results)).catch(console.error)
  }, [])

  return (
    <div className='home'>
      <Navbar/>
      <div className="more-cards page-content">
        <MediaRow title="Trending TV Shows" items={trending} mediaType="tv" />
        <MediaRow title="Popular Series" items={popular} mediaType="tv" />
        <MediaRow title="Top Rated" items={topRated} mediaType="tv" />
        <MediaRow title="Currently Airing" items={onAir} mediaType="tv" />
      </div>
      <Footer/>
    </div>
  )
}

export default TVShows
