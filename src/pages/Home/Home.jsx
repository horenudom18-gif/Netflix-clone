import React, { useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCrads'
import Footer from '../../components/Footer/Footer'
import InfoModal from '../../components/InfoModal/InfoModal'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  // Fight Club (TMDB id 550) — stand-in "featured" movie for the hero banner.
  const heroMovieId = 550;

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt=""className='banner-img' />
        <div className="hero-caption">
            <img src={hero_title} alt="" className='caption-img'/>
            <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
            <div className='hero-btns'>
                <button className='btn' onClick={()=>navigate(`/player/${heroMovieId}`)}> <img src={play_icon} alt="" /> Play</button>
                <button className='btn dark-btn' onClick={()=>setShowInfo(true)}> <img src={info_icon} alt="" /> More info</button>
            </div>
            <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Only on Netflix"} category={"popular"}/>
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
        <TitleCards title={"Topic for you"} category={"now_playing"}/>
      </div>
      <Footer/>
      {showInfo && <InfoModal movieId={heroMovieId} onClose={()=>setShowInfo(false)} />}
    </div>
  )
}

export default Home
