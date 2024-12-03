import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './OtherProfile.module.css'

  export default function Profile() {
  const [userData, setUserData] = useState(null);
  const profileName = useParams();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/profiles`);
        const data = await response.json();
        const this_user = data.filter(user => (user.first_name + " " + user.last_name) === profileName.profileID)[0];
        setUserData(this_user);
      } catch (error) {
        console.log(error.message);
      };
    };
    fetchUserData();
  }, [profileName]) 

  function Statistic(props) {
    return (
      <div className={styles.statistic}>
        <h3>{props.num}</h3>
        <h4>{props.type}</h4>
      </div>
    );
  };

  function ProfileBannerInfo(props) {
    return (    
      <div className={styles.profileInfoContainer}>
        <div className={styles.profilePicture}>
          <img src={props.user.profile_icon} alt="User Icon"/>
        </div>
        <div className={styles.textInfo}>
          <h1>{props.user.first_name + " "+ props.user.last_name}</h1>
          <h2>{props.user.email}</h2>
          <div className={styles.statisticsField}>
            <Statistic num={props.user.artist_tags.length + props.user.genre_tags.length} type="Tags"/>
            <Statistic num={props.user.following.length} type="Following" />
            <Statistic num={props.user.followers.length} type="Followers" />
          </div>
          <p>{props.user.bio}</p>
        </div>
      </div>
    );
  };

  function Tag(props) {
    return (
      <div className={styles.individualTag}>{props.itemName}</div>
    );
  };

  function Tags(props) { 
    return (
      <div className={styles.tagsField}>
        <div className={styles.tagType}>
          <h2>{props.type}</h2>
          {<MagnifyingGlassIcon />}
        </div>
        <div className={styles.tagsList}>
          {props.list.map(item => <Tag itemName={item} />)}
        </div>
      </div>
    );
  };

  if (!userData) {
    return (
      <div className={styles.mainBody}>
        <section className={styles.desktopSectionProfile}>
          <div className={styles.profileBanner}>
            <NavigationBar currentPage={"Message"}/>
            <LoadingBox/>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.profileBanner}>
      <NavigationBar currentPage={"OtherUser"}/>
      <ProfileBannerInfo user={userData} />
      </div>
      <div className={styles.tagsContainer}>
        <h2>Tags</h2>
        <Tags type="Artists" list={userData.artist_tags} />
        <Tags type="Genres" list={userData.genre_tags} />
      </div>
      <Footer />
  </div>
  );
}
