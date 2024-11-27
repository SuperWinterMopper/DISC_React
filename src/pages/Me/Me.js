import React, { useState } from "react";
import { Link } from 'react-router-dom';
import MagnifyingGlassIcon from '../../assets/MagnifyingGlassIcon';
import Footer from '../../components/Footer/Footer';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './Me.module.css'

const artists = ["Death Grips", "Arca", "Oneohtrix Point Never", "Vangelis", "The Caretaker", "Dälek", "John Maus", "Shabazz Palaces", "Tim Hecker", "Grouper", "Björk", "Sun O)))", "Lorenzo Senni", "Kaitlyn Aurelia Smith", "Mary Lattimore", "Avey Tare", "Scott Walker", "Zola Jesus", "Andy Stott", "Fennesz"];

const genres = ["Vaporwave", "Chillwave", "Dungeon Synth", "Synthwave", "Darkwave", "Drone Metal", "Space Rock", "Post-Rock", "Shoegaze", "Math Rock", "Sludge Metal", "Electropunk", "Folk Metal", "Avant-Garde Jazz", "Blackgaze", "Trip-Hop", "Neoclassical Darkwave", "Breezeway Pop", "Witch House", "Psychedelic Trance"];

  export default function Profile() {
  function statistic(props) {
    return (
      <div className={styles.statistic}>
        <h3>{props.num}</h3>
        <h4>{props.type}</h4>
      </div>
    )
  }

  function profileBannerInfo(props) {
    return (    
      <div className={styles.profileInfoContainer}>
        <div className={styles.profilePicture}>
          <img src='https://resources.tidal.com/images/2eaf0497/bcbd/45d5/bf9b/4e83e23b53b0/640x640.jpg' alt="User Icon"/>
        </div>
        <div className={styles.textInfo}>
          <h1>Acton Healy</h1>
          <h2>@myemail123456789@gmail.com</h2>
          <div className={styles.statisticsField}>
            {statistic({num: 40, type: "Tags"})}
            {statistic({num: 28, type: "Following"})}
            {statistic({num: 23, type: "Followers"})}
          </div>
          <p>Hi hope you're having an endurable day :)</p>
        </div>
      </div>
    );
  }

  function Tag(props) {
    return (
      <div className={styles.individualTag}>{props.itemName}</div>
    );
  };

  function Tags(props) { 
    return (
      <div className={styles.tagsField}>
        <div className={styles.tagTyp}>
          <h2>{props.type}</h2>
          {<MagnifyingGlassIcon />}
        </div>
        <div className={styles.tagsList}>
          {props.list.map(item => <Tag itemName={item} />)}
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.mainBody}>
    {/* <section className={styles.desktopSectionProfile}> */}
      <div className={styles.profileBanner}>
      <NavigationBar currentPage={"Profile"}/>
      {profileBannerInfo()}
      </div>
      <div className={styles.tagsContainer}>
        <h2>Tags</h2>
        {Tags({type: "Artists", list: artists})}
        {Tags({type: "Genres", list: genres})}
      </div>
      <Footer />
      {/* </section> */}
  </div>
  );
}