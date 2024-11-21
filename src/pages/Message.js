import './Message.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIconSelected';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';
import LoadingBox from '../components/LoadingBox';
import NoResultsBox from '../components/NoResultsBox';
import useFilteredUsers from '../hooks/useFilteredUsers';

function Message() {
  const [currentPage, setCurrentPage] = useState("Message");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const { filteredUsers, loading } = useFilteredUsers(searchQuery, "Descending");

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

  function messagesField() {
    if (loading) {return <LoadingBox/>}
    else if(filteredUsers.length === 0) {return <NoResultsBox search={searchQuery}/>}
    else {
      return (
        <div className="messagesField">
          {filteredUsers.map(user => message({key: user.key, username: user.username, message: user.bio, time: "9am", messageNum: 2, iconLink: user.iconLink}))}
        </div>
      )
    }
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
          {messagesField()}
        </section>
        <footer>
          <h5>Spirit</h5>
        </footer>
      </section>
    </div>
  ); 
}

export default Message;