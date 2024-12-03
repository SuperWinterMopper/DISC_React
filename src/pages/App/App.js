import './App.css';
import React, { useState, useCallback } from "react";
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import SortAscendingIcon from '../../assets/SortAscendingIcon';
import SortDescendingIcon from '../../assets/SortDescendingIcon';
import Profile from '../../components/ProfileCard/ProfileCard'
import useFilteredUsers from '../../hooks/useFilteredUsers';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import NoResultsBox from '../../components/NoResultsBox/NoResultsBox';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [sortStyle, setSortStyle] = useState("Descending");
  const { filteredUsers, loading } = useFilteredUsers(searchQuery, sortStyle);
  const changeSort = useCallback(() => {
    if(sortStyle === "Descending") setSortStyle("Ascending");
    else setSortStyle("Descending");
  }, [sortStyle]);
  
  function SearchFieldContent() {
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
    ); 
  };

  const changeFollow = useCallback((props) => {
    if (props.isFollowed) {
      setFollowedUsers(prev => prev.filter(user => user.username !== props.username));
    } else {
      setFollowedUsers(prev => [...prev, props.userData]);
    }
  }, []); 

  function UsersField() {
    if(loading) {return <LoadingBox/>}
    else if(filteredUsers.length === 0) {return <NoResultsBox search={searchQuery} />}
    else {
      return (
        <div className="users-field">
          {filteredUsers.map(user => (<Profile 
            key={user.key}
            user={user}
            followedUsers={followedUsers}
            followChange={() => changeFollow({username: user.username, isFollowed: followedUsers.some(followed => followed.username === user.username), userData: {username: user.username, matchness: user.matchness, iconLink: user.iconLink}})}
            />
          ))}
        </div>
      );
    };
  };

  return (
    <div className="main-body">
      <NavigationBar currentPage={"Search"}/>
      <section className="search-container">
        <SearchFieldContent />
        <UsersField />
      </section>
      <Footer />
    </div>
  ); 
};