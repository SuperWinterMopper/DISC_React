import './Profile.css';
import React, { useState, useEffect } from "react";
import { Link, useFetcher, useParams } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIconSelected';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIcon';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';

const artists = ["Death Grips", "Arca", "Oneohtrix Point Never", "Vangelis", "The Caretaker", "Dälek", "John Maus", "Shabazz Palaces", "Tim Hecker", "Grouper", "Björk", "Sun O)))", "Lorenzo Senni", "Kaitlyn Aurelia Smith", "Mary Lattimore", "Avey Tare", "Scott Walker", "Zola Jesus", "Andy Stott", "Fennesz"];

const genres = ["Vaporwave", "Chillwave", "Dungeon Synth", "Synthwave", "Darkwave", "Drone Metal", "Space Rock", "Post-Rock", "Shoegaze", "Math Rock", "Sludge Metal", "Electropunk", "Folk Metal", "Avant-Garde Jazz", "Blackgaze", "Trip-Hop", "Neoclassical Darkwave", "Breezeway Pop", "Witch House", "Psychedelic Trance"];

  export default function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");
  const [userData, setUserData] = useState(null);
  const profileName = useParams();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");
        const data = await response.json();
        const this_user = data.filter(user => (user.firstName + " " + user.lastName) === profileName.profileID)[0];
        setUserData(this_user);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUserData();
  }, [profileName]) 

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
          <img src={props.user.profilePicture} alt="User Icon"/>
        </div>
        <div className='textInfo'>
          <h1>{props.user.firstName + " "+ props.user.lastName}</h1>
          <h2>{props.user.email}</h2>
          <div className='statisticsField'>
            {statistic({num: 40, type: "Tags"})}
            {statistic({num: 28, type: "Following"})}
            {statistic({num: 23, type: "Followers"})}
          </div>
          <p>{props.user.bio}</p>
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

  if (!userData) {
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
            <div>Loading...</div>
          </div>
        </section>
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
        {profileBannerInfo({user: userData})}
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