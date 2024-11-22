import styles from './Login.module.css'
import React, { useState, useContext, useCallback } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import SearchIcon from '../../assets/SearchIcon/SearchIcon';
import MessageIcon from '../../assets/MessageIcon/MessageIconNotification';
import LockIcon from '../../assets/LockIcon'

const CurrentPageContext = React.createContext({
  currentPage: "",
  setCurrentPage: () => {},
});

export default function Login() {
  const [currentPage, setCurrentPage] = useState("");
  const [formData, setFormData] = useState({
    email: "", password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form submitted:", formData);
    // send to API here
  };

  function loginInput(props) {
    return ( 
      <div className={styles.inputFieldBox}>
        <props.icon />
        <input type={props.fieldType} name={props.fieldType} value={props.data} onChange={handleChange} 
        />
      </div>
    );
  };
  
  function loginBox() {
    return (
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {loginInput({fieldType: "email", data: formData.email, icon: LockIcon})}
          {loginInput({fieldType: "password", data: formData.password, icon: ProfileIcon})}
        </form>
      </div>
    );
  }; 

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
    <div className={styles.mainBody}>
      <section className={styles.desktopSection}>
        <div className={styles.centerSection}>
          <img src={SpiritIcon} alt="Spirit Icon" />
          {loginBox()}
        </div>
        <footer>
          <h5>Spirit</h5>
        </footer>
      </section>
    </div>
  </CurrentPageContext.Provider>
  );
};