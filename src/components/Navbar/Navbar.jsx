import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark')
      }else{
         navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  function handleSearchSubmit(e){
    e.preventDefault();
    if(query.trim()){
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  }

  const navLinks = (
    <>
      <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/tv-shows" className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>TV Shows</NavLink></li>
      <li><NavLink to="/movies" className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>Movies</NavLink></li>
      <li><NavLink to="/new-popular" className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>New & Popular</NavLink></li>
      <li><NavLink to="/my-list" className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>My List</NavLink></li>
      <li><NavLink to="/languages" className={({isActive}) => isActive ? 'active' : ''} onClick={()=>setMenuOpen(false)}>Browse by languages</NavLink></li>
    </>
  );

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">☰</button>
        <ul className="desktop-nav">
            {navLinks}
        </ul>
      </div>
      {menuOpen && (
        <ul className="mobile-nav">
          {navLinks}
        </ul>
      )}
      <div className="navbar-right">
        <form className={`search-form ${searchOpen ? 'is-open' : ''}`} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Titles..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            autoFocus={searchOpen}
          />
        </form>
        <img
          src={search_icon}
          alt=""
          className='icons'
          onClick={()=>setSearchOpen(!searchOpen)}
        />
        <p> Children</p>
        <img src={bell_icon} alt=""className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt=""className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={()=>{logout()}}> Sign Out of Netfllix </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
