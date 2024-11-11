import './Profile.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIconSelected';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIcon';

export default function Profile() {
  const [currentPage, setCurrentPage] = useState("Message");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
          <img src='https://resources.tidal.com/images/511f57cc/b5db/45f6/b132/3f1a6f2f627a/640x640.jpg'></img>
        </div>
        <div className='textInfo'>
          <h1>Ethan Pineda</h1>
          <h2>@themarias@gmail.com</h2>
          <div className='statisticsField'>
            {statistic({num: 40, type: "Tags"})}
            {statistic({num: 28, type: "Following"})}
            {statistic({num: 23, type: "Followers"})}
          </div>
          <p>Junior at Northwestern University Studying Mechanical Engineering.</p>
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
          {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Profile"})}
          {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
        </nav-bar>
        {profileBannerInfo()}
      </div>
      <footer>
        <h5>Spirit</h5>
      </footer>
    </section>
  </div>
  );
}