
import './Profile.css';
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon';
import ProfileIcon from '../../assets/ProfileIcon';
import SearchIcon from '../../assets/SearchIcon';
import MessageIcon from '../../assets/MessageIcon';
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import LoadingBox from '../../components/LoadingBox/LoadingBox';

  export default function Profile() {
  const [currentPage, setCurrentPage] = useState("OtherUser");
  const [userData, setUserData] = useState(null);
  const profileName = useParams();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users`);
        const data = await response.json();
        console.log(profileName.profileID);
        console.log(data);
        const this_user = data.filter(user => (user.first_name + " " + user.last_name) === profileName.profileID)[0];
        setUserData(this_user);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUserData();
  }, [profileName]) 

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
          <img src={props.user.profile_icon} alt="User Icon"/>
        </div>
        <div className='textInfo'>
          <h1>{props.user.first_name + " "+ props.user.last_name}</h1>
          <h2>{props.user.email}</h2>
          <div className='statisticsField'>
            {statistic({num: props.user.artist_tags.length + props.user.genre_tags.length, type: "Tags"})}
            {statistic({num: props.user.following.length, type: "Following"})}
            {statistic({num: props.user.followers.length, type: "Followers"})}
          </div>
          <p>{props.user.bio}</p>
        </div>
      </div>
    );
  }

  function Tag(props) {
    return (
      <div className='individualTag'>{props.itemName}</div>
    );
  };

  function Tags(props) { 
    return (
      <div className='tagsField'>
        <div className='tagType'>
          <h2>{props.type}</h2>
          {<MagnifyingGlassIcon />}
        </div>
        <div className='tagsList'>
          {props.list.map(item => <Tag itemName={item} />)}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="main-body">
        <section className='desktopSectionProfile'>
          <div className='profileBanner'>
            <nav-bar>
              <SpiritIcon />
              {navbarButton({ text: "Search", icon : <SearchIcon />, to : "/"})}
              {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Me"})}
              {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
            </nav-bar>
            <LoadingBox/>
          </div>
        </section>
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
          {navbarButton({ text: "Profile", icon : <ProfileIcon />, to : "/Me"})}
          {navbarButton({ text: "Message", icon : <MessageIcon />, to : "/Message"})}
        </nav-bar>
        {profileBannerInfo({user: userData})}
      </div>
      <div className='tagsContainer'>
        <h2>Tags</h2>
        {Tags({type: "Artists", list: userData.artist_tags})}
        {Tags({type: "Genres", list: userData.genre_tags})}
      </div>
      <footer>
        <h5>Spirit</h5>
      </footer>
    </section>
  </div>
  );
}
