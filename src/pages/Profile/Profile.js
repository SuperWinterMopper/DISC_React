
import './Profile.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';


  export default function Profile() {
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

  function statistic(props) {
    return (
      <div className='statistic'>
        <h3>{props.num}</h3>
        <h4>{props.type}</h4>
      </div>
    );
  };

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
  };

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
  };

  if (!userData) {
    return (
      <div className="main-body">
        <section className='desktopSectionProfile'>
          <div className='profileBanner'>
            <NavigationBar currentPage={"Message"}/>
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
        <NavigationBar currentPage={"OtherUser"}/>
        {profileBannerInfo({user: userData})}
        </div>
        <div className='tagsContainer'>
          <h2>Tags</h2>
          {Tags({type: "Artists", list: userData.artist_tags})}
          {Tags({type: "Genres", list: userData.genre_tags})}
        </div>
        <Footer />
      </section>
  </div>
  );
}
