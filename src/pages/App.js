import './App.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../assets/SpiritIcon';
import ProfileIcon from '../assets/ProfileIcon';
import SearchIcon from '../assets/SearchIcon';
import MessageIcon from '../assets/MessageIcon';
import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';
import SortAscendingIcon from '../assets/SortAscendingIcon';
import SortDescendingIcon from '../assets/SortDescendingIcon';

  const users = [
  {username: "lisa", matchness: 29, iconLink: "https://resources.tidal.com/images/0c3de7f6/d0a6/4d51/8344/1f110bfd8c27/320x320.jpg"},
  {username: "jesuscrhistthethird", matchness: 81, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/86799671/a18c/4a8b/935a/3f7e1ac97f39/640x640.jpg"},
  {username: "The Scream", matchness: 86, iconLink: "https://resources.tidal.com/images/2fa97549/1898/494f/a4bc/0e09d0a25a6e/640x640.jpg"},
  {username: "pepsi man", matchness: 9, iconLink: "https://resources.tidal.com/images/e5685e43/c607/4a8a/8bec/86a9dd5648ad/320x320.jpg"},
  {username: "amazingella", matchness: 92, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/6b95de51/316d/4c53/9f10/5261a9e3bac0/640x640.jpg"},
  {username: "fred", matchness: 74, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/6cdffdfa/3819/4fcb/b961/56da72a7f3db/640x640.jpg"},
  {username: "selectperson", matchness: 52, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/96b5aae4/33ff/4ff7/9d84/fe3a6f17137b/640x640.jpg"},
  {username: "lovely user #4", matchness: 46, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/c6448675/7103/45f3/a1d2/6085f3b5f59e/640x640.jpg"},
  {username: "acton healy", matchness: 96, iconLink: "https://resources.tidal.com/images/0843b27b/4466/4c7f/bfd6/4df4507cdf2a/640x640.jpg"},
  {username: "saratiqqqqqqqqqqqqqqqqqqqqqqqqqq", matchness: 34, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/17024b49/483a/418f/af81/b5bc8cbb5469/320x320.jpg"},
  {username: "British Person 400", matchness: 64, iconLink: "https://resources.tidal.com/images/2398c977/48e5/44da/97c2/25da8c9c1869/640x640.jpg"},
  {username: "wong bb", matchness: 20, iconLink: "https://resources.tidal.com/images/c428fcef/c562/42d7/b083/1d4749145515/640x640.jpg"},  
  {username: "Ashley", matchness: 13, iconLink: "https://resources.tidal.com/images/04733d83/e129/4c23/974d/8686e0f68ab5/640x640.jpg"},
  {username: "texas cowboy", matchness: 23, iconLink: "https://resources.tidal.com/images/116aec03/a6e8/4a73/ab1e/60e99bdd079e/640x640.jpg"},
  {username: "vocoder", matchness: 7, iconLink: "https://resources.tidal.com/images/12710f00/26e3/475d/bef0/3cda307be41e/640x640.jpg"},
  {username: "Octillo", matchness: 62, iconLink: "https://resources.tidal.com/images/3009543d/652a/4ab4/ad79/c636323a63cd/640x640.jpg"}]

function App() {
  const [currentPage, setCurrentPage] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [sortStyle, setSortStyle] = useState("Descending")

  useEffect(() => {
    let filtered = users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()));
    if(sortStyle === "Descending") {
      filtered.sort((a, b) => b.matchness - a.matchness);
    } else {
      filtered.sort((a, b) => a.matchness - b.matchness);
    }
    setFilteredUsers(filtered);
  }, [searchQuery, sortStyle]); 
    
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

  function user(props) {
    const isFollowed = followedUsers.some(u => u.username === props.username);
    let matchness = "minus-40-match"
    if(props.matchness >= 80) matchness = "plus-80-match";
    else if(props.matchness >= 40) matchness = "plus-40-match";

    const changeFollow = () => {
      if(followedUsers.some(u => u.username === props.username)) 
        setFollowedUsers(followedUsers.filter(u => u.username !== props.username))
      else {
        setFollowedUsers([ ...followedUsers, {
          username: props.username, 
          matchesss: props.matchness,
          iconLine: props.iconLink
        }])  
      }
    }

    return (
      <div className="user" id={isFollowed ? "followedUser" : ""}>
        <img className="user-icon" src={props.iconLink} alt="User Icon"/>
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
            {filteredUsers.map(u => user({u: u, username: u.username, matchness: u.matchness, iconLink : u.iconLink}))}
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