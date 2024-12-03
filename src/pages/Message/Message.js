import './Message.css';
import React, { useState } from "react";
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import NoResultsBox from '../../components/NoResultsBox/NoResultsBox';
import useFilteredUsers from '../../hooks/useFilteredUsers';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';


export default function Message() {
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredUsers, loading } = useFilteredUsers(searchQuery, "Descending");

  function SearchFieldContent() {
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

  function MessagesField() {
    if (loading) {return <LoadingBox/>}
    else if(filteredUsers.length === 0) {return <NoResultsBox search={searchQuery}/>}
    else {
      return (
        <div className="messagesField">
          {filteredUsers.map(user => message({key: user.key, username: user.username, message: user.bio, time: "9am", messageNum: 2, iconLink: user.iconLink}))}
        </div>
      );
    };
  };

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
      <NavigationBar currentPage={"Message"}/>
      <section className='search-container'>
        <SearchFieldContent />
        <MessagesField />        
      </section> 
      <Footer />
    </div>
  ); 
}