import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MediaRow from '../../components/MediaRow/MediaRow'
import { getTrendingMovies, getUpcomingMovies, getTrendingTV, getOnTheAirTV } from '../../api/tmdb'
import '../Home/Home.css'

const NewPopular = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [trendingTV, setTrendingTV] = useState([])
  const [onAir, setOnAir] = useState([])

  useEffect(() => {
    getTrendingMovies().then((res) => setTrendingMovies(res.results)).catch(console.error)
    getUpcomingMovies().then((res) => setUpcoming(res.results)).catch(console.error)
    getTrendingTV().then((res) => setTrendingTV(res.results)).catch(console.error)
    getOnTheAirTV().then((res) => setOnAir(res.results)).catch(console.error)
  }, [])

  return (
    <div className='home'>
      <Navbar/>
      <div className="more-cards page-content">
        <MediaRow title="Trending Movies This Week" items={trendingMovies} mediaType="movie" />
        <MediaRow title="Coming Soon to Theaters" items={upcoming} mediaType="movie" />
        <MediaRow title="Trending TV Shows" items={trendingTV} mediaType="tv" />
        <MediaRow title="Airing Now" items={onAir} mediaType="tv" />
      </div>
      <Footer/>
    </div>
  )
}

export default NewPopular
