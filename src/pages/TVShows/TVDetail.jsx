import React, { useEffect, useState } from 'react'
import '../Player/Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQyYzBiM2JmOTJmNDcyMzE2NWNiYTNkMDYyMDBkOCIsIm5iZiI6MTc4NjM3MTI0OC45NDUsInN1YiI6IjZhNzlkY2IwNThkYjZjNTI3NzQ5ZDUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ul71UjI4wW1muUewu8ciWMKQwGt8RiUh57dqCtJON4s'

const TVDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: '', key: '', published_at: '', type: ''
  })

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: `Bearer ${BEARER_TOKEN}` },
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0] || {}))
      .catch((err) => console.error(err))
  }, [id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />
      <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default TVDetail
