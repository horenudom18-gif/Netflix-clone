import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom'

const TitleCrads = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQyYzBiM2JmOTJmNDcyMzE2NWNiYTNkMDYyMDBkOCIsIm5iZiI6MTc4NjM3MTI0OC45NDUsInN1YiI6IjZhNzlkY2IwNThkYjZjNTI3NzQ5ZDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul71UjI4wW1muUewu8ciWMKQwGt8RiUh57dqCtJON4s'}
};

  function scrollRow(direction) {
    const el = cardsRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  useEffect( ()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='titel-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list-wrap">
        <button className="row-arrow row-arrow--left" onClick={() => scrollRow(-1)} aria-label="Scroll left">‹</button>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index)=>{
              return <Link to={`/player/${card.id}`} className="card" key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                  <p>{card.original_title}</p>
              </Link>
          })}
        </div>
        <button className="row-arrow row-arrow--right" onClick={() => scrollRow(1)} aria-label="Scroll right">›</button>
      </div>
    </div>
  )
}

export default TitleCrads
