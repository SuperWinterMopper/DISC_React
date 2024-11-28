import './Profile.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIconSelected';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIcon';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';

const artists = ["Death Grips", "Arca", "Oneohtrix Point Never", "Vangelis", "The Caretaker", "Dälek", "John Maus", "Shabazz Palaces", "Tim Hecker", "Grouper", "Björk", "Sun O)))", "Lorenzo Senni", "Kaitlyn Aurelia Smith", "Mary Lattimore", "Avey Tare", "Scott Walker", "Zola Jesus", "Andy Stott", "Fennesz"];

const genres = ["Vaporwave", "Chillwave", "Dungeon Synth", "Synthwave", "Darkwave", "Drone Metal", "Space Rock", "Post-Rock", "Shoegaze", "Math Rock", "Sludge Metal", "Electropunk", "Folk Metal", "Avant-Garde Jazz", "Blackgaze", "Trip-Hop", "Neoclassical Darkwave", "Breezeway Pop", "Witch House", "Psychedelic Trance"];

  export default function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");

  function navbarButton(props) {
    return ( 
      <Link to={props.to} className='nav-bar-link'>
        <button>
          {props.icon}
          <p id={props.text === currentPage ? "selected" : ""}>{props.text}</p>
        </button>
      </Link>
    )
  }

  function statistic(props) {
    return (
      <div className='statistic'>
        <h3>{props.num}</h3>
        <h4>{props.type}</h4>
      </div>
    )
  }

  function profileBannerInfo(props) {
    return (    
      <div className='profileInfoContainer'>
        <div className='profilePicture'>
          <img src='https://resources.tidal.com/images/2eaf0497/bcbd/45d5/bf9b/4e83e23b53b0/640x640.jpg' alt="User Icon"/>
        </div>
        <div className='textInfo'>
          <h1>Acton Healy</h1>
          <h2>@myemail123456789@gmail.com</h2>
          <div className='statisticsField'>
            {statistic({num: 40, type: "Tags"})}
            {statistic({num: 28, type: "Following"})}
            {statistic({num: 23, type: "Followers"})}
          </div>
          <p>Hi hope you're having an endurable day :)</p>
        </div>
      </div>
    );
  }

  function Tag(props) {
    return (
      <div className='individualTag'>{props.itemName}</div>
    );
  };

  function Tags(props) { 
    return (
      <div className='tagsField'>
        <div className='tagType'>
          <h2>{props.type}</h2>
          {<MagnifyingGlassIcon />}
        </div>
        <div className='tagsList'>
          {props.list.map(item => <Tag itemName={item} />)}
        </div>
      </div>
    );
  }
  
  return (
    <div className="main-body">
    <section className='desktopSectionProfile'>
      <div className='profileBanner'>
        <nav-bar>
          <SpiritIcon />
          {navbarButton({ text: "Search", icon : <SearchIcon />, to : "/"})}
          {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Me"})}
          {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
        </nav-bar>
        {profileBannerInfo()}
      </div>
      <div className='tagsContainer'>
        <h2>Tags</h2>
        {Tags({type: "Artists", list: artists})}
        {Tags({type: "Genres", list: genres})}
      </div>
      <footer>
        <h5>Spirit</h5>
      </footer>
    </section>
  </div>
  );
}