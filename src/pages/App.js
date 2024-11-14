  import './App.css';
  import React, { useState, useContext, useCallback } from "react";
  import { Link } from 'react-router-dom';
  import SpiritIcon from '../assets/SpiritIcon';
  import ProfileIcon from '../assets/ProfileIcon';
  import SearchIcon from '../assets/SearchIconSelected';
  import MessageIcon from '../assets/MessageIcon';
  import MagnifyingGlassIcon from '../assets/MagnifyingGlassIcon';
  import SortAscendingIcon from '../assets/SortAscendingIcon';
  import SortDescendingIcon from '../assets/SortDescendingIcon';
  import Profile from '../components/Profile'
  import useFilteredUsers from '../hooks/useFilteredUsers';

  
  const CurrentPageContext = React.createContext({
    currentPage: "Search",
    setCurrentPage: () => {},
  });
  
  function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [followedUsers, setFollowedUsers] = useState([]);
    const [sortStyle, setSortStyle] = useState("Descending");
    const [currentPage, setCurrentPage] = useState("Search");
    const { filteredUsers, loading } = useFilteredUsers(searchQuery, sortStyle);

    const getMatchnessColor = useCallback((matchness) => {
      if (matchness >= 80) return "plus-80-match";
      else if (matchness >= 40) return "plus-40-match";
      else return "minus-40-match";  
    }, []);

    const changeSort = useCallback(() => {
      if(sortStyle === "Descending") setSortStyle("Ascending");
      else setSortStyle("Descending");
    }, [sortStyle]);
    
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

    function NavbarButton(props) {
      const { currentPage } = useContext(CurrentPageContext);
      return ( 
        <Link to={props.to} className='nav-bar-link'>
          <button>
            {props.icon}
            <p id={props.text === currentPage ? "selected" : ""}>{props.text}</p>
          </button>
        </Link>
      )
    }
    const changeFollow = useCallback((props) => {
      if (props.isFollowed) {
        setFollowedUsers(prev => prev.filter(user => user.username !== props.username));
      } else {
        setFollowedUsers(prev => [...prev, props.userData]);
      }
    }, []);

    if(loading) {
      return (
        <h1>LOADING...</h1>
      )
    }

    return (
      <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
        <div className="main-body">
          <section className='desktop-section'>
            <nav-bar>
              <SpiritIcon />
              {NavbarButton({ text: "Search", icon : <SearchIcon />, to : "/"})}
              {NavbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Me"})}
              {NavbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
            </nav-bar>
            <section className='search-container'>
              {searchFieldContent()}
              <div className="users-field">
                {filteredUsers.map(user => (<Profile 
                  key={user.key}
                  username={user.username}
                  matchness={user.matchness}
                  iconLink={user.iconLink}
                  isFollowed={followedUsers.some(followed => followed.username === user.username)}
                  getMatchnessColor={getMatchnessColor}
                  followChange={() => changeFollow({
                    username: user.username,
                    isFollowed: followedUsers.some(followed => followed.username === user.username),
                    userData: {username: user.username, matchness: user.matchness, iconLink: user.iconLink}
                  })}
                />
              ))}
              </div>
            </section>
            <footer>
              <h5>Spirit</h5>
            </footer>
          </section>
        </div>
      </CurrentPageContext.Provider>
    ); 
  }

  export default App;