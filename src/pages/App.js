import './App.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SearchIcon from '../assets/SearchIconSelected';
import MessageIcon from '../assets/MessageIcon';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';
import SortAscendingIcon from '../assets/SortAscendingIcon';
import SortDescendingIcon from '../assets/SortDescendingIcon';

function App() {
  const [currentPage, setCurrentPage] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [usersDisplayData, setUsersDisplayData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [sortStyle, setSortStyle] = useState("Descending");

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");
        const userData = await response.json();
        setAllUsers(userData);
        const processedData = userData.map(user => ({
          key: user.id,
          username: user.firstName + " " + user.lastName,
          //for the moment, matchness is randomly assigned. Once I have my own database, it will be fixed
          matchness: Math.floor(Math.random() * 101),  
          iconLink: user.profilePicture,
        }));

        setUsersDisplayData(processedData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAllUsers();
  }, [])

  useEffect(() => {
    let filtered = usersDisplayData.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
    if(sortStyle === "Descending") {
      filtered.sort((a, b) => b.matchness - a.matchness);
    } else {
      filtered.sort((a, b) => a.matchness - b.matchness);
    }
    setFilteredUsers(filtered);
  }, [usersDisplayData, searchQuery, sortStyle]); 
    
  function changeSort() {
    if(sortStyle === "Descending") setSortStyle("Ascending");
    else setSortStyle("Descending");
  }
  
  function searchFieldContent() {
    return ( 
      <div className="search-field">
        <h1>Search</h1>
        <div className="search-bar">
            <button className="sort-icon" onClick={changeSort}>{sortStyle === "Descending" ? <SortDescendingIcon /> : <SortAscendingIcon/>}</button>
            <input type="text" placeholder="Search based on your preferences..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
            {<MagnifyingGlassIcon />}
        </div>
        <div className="recommended" id={searchQuery === "" ? "" : "hidden"}><h2>Recommended:</h2></div>  
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

  function profile(props) {
    const isFollowed = followedUsers.some(user=> user.username === props.username);
    let matchness = "minus-40-match";
    if(props.matchness >= 80) matchness = "plus-80-match";
    else if(props.matchness >= 40) matchness = "plus-40-match";

    const changeFollow = () => {
      if(followedUsers.some(user=> user.username === props.username)) 
        setFollowedUsers(followedUsers.filter(user=> user.username !== props.username))
      else {
        setFollowedUsers([ ...followedUsers, {
          username: props.username, 
          matchesss: props.matchness,
          iconLink: props.iconLink
        }])  
      }
    }

    return (
      <div className="user" id={isFollowed ? "followedUser" : ""}>
        <div className='user-icon'>
          <img src={props.iconLink} alt="User Icon"/>
        </div>
        <div className="user-info">
            <h3>{props.username}</h3>
            <h4 id={matchness}>{props.matchness}% match</h4>
        </div>
        <button className="follow-button" id={isFollowed ? "followed" : "unfollowed"} onClick={changeFollow}>
          {isFollowed ? "Following" : "Follow"}
        </button>
      </div>
    )
  }

  return (
    <div className="main-body">
      <section className='desktop-section'>
        <nav-bar>
          <SpiritIcon />
          {navbarButton({ text: "Search", icon : <SearchIcon />, to : "/"})}
          {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Profile"})}
          {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
        </nav-bar>
        <section className='search-container'>
          {searchFieldContent()}  
          <div className="users-field">
            {filteredUsers.map(user=> profile({username: user.username, matchness: user.matchness, iconLink : user.iconLink}))}
          </div>
        </section>
        <footer>
          <h5>Spirit</h5>
        </footer>
      </section>
    </div>
  ); 
}

export default App;