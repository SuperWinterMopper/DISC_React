import './Message.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SearchIcon from '../assets/SearchIcon';
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
    console.log("HI THIS USEEFFECT IS RUN")
    if(sortStyle === "Descending") {
      filtered.sort((a, b) => b.matchness - a.matchness);
      console.log("descending is  RUN")
    } else {
      filtered.sort((a, b) => a.matchness - b.matchness);
      console.log("ASCENING  is  RUN")
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

  function message(props) {
    return (
      <button className="messageBox">
        <div className="userIcon">
          {/* <img src={props.iconLink} alt="User Icon"/> */}
        </div>
        <div className="usernameMessage">
          <p className="username">{props.username}</p>
          <p className="message">{props.message}</p>
        </div>
        <div className="timeNotifications">
          <p className='time'>3:54am</p>
          <div className='notification'>2</div>
        </div>
      </button>
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
          <div className="messagesField">
            {message({username: "Andy Edwards", message: "Stop by at my house"})}
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