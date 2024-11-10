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
      </div>
      <footer>
        <h5>Spirit</h5>
      </footer>
    </section>
  </div>
  );
}