import './Message.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIconSelected';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';

function Message() {
  const [currentPage, setCurrentPage] = useState("Message");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");
        const userData = await response.json();
        setAllUsers(userData);
        const processedData = userData.map(user => ({
          key: user.id,
          username: user.firstName + " " + user.lastName,
          iconLink: user.profilePicture,
          message: "Hi, I'm a " + user.bio,
          //for the moment, these are constant, but with own database can easily fill with real data
          time: "19h ago",
          messageNum: 2,  
        }));

        setMessageData(processedData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllUsers();
  }, [])

  useEffect(() => {
    let filtered = messageData.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredUsers(filtered);
  }, [messageData, searchQuery]); 

  function searchFieldContent() {
    return ( 
      <div className="search-field">
        <h1>Message</h1>
        <div className="search-bar">
            <input type="text" placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{marginLeft: '52px'}}></input>
            {<MagnifyingGlassIcon />}
        </div>
      </div> 
    )
  }

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

  function message(props) {
    return (
      <button className="messageBox">
        <div className="userIcon">
          <img src={props.iconLink} alt="User Icon"/>
        </div>
        <div className="usernameMessage">
          <p className="username">{props.username}</p>
          <p className="message">{props.message}</p>
        </div>
        <div className="timeNotifications">
          <p className='time'>{props.time}</p>
          <div className='notification'>{props.messageNum}</div>
        </div>
      </button>
    )
  }

  return (
    <div className="main-body">
      <section className='desktopSectionMessage'>
        <nav-bar>
          <SpiritIcon />
          {navbarButton({ text: "Search", icon : <SearchIcon />, to : "/"})}
          {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Me"})}
          {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
        </nav-bar>

        <section className='search-container'>
          {searchFieldContent()}  
          <div className="messagesField">
            {filteredUsers.map(user => message({username: user.username, message: user.message, time: user.time, messageNum: user.messageNum, iconLink: user.iconLink}))}
          </div>
        </section>
        <footer>
          <h5>Spirit</h5>
        </footer>
      </section>
    </div>
  ); 
}

export default Message;