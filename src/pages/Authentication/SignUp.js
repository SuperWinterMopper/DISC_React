import styles from './Login.module.css'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import LockIcon from '../../assets/LockIcon';
import Footer from '../../components/Footer/Footer';
import { AuthProvider, useAuth } from '../../hooks/useAuth'; 

export default function Login() {

  function LoginInput(props) {
    return ( 
      <div className={styles.inputFieldBox}>
        <props.icon />
        <input type={props.fieldType} name={props.fieldType}  placeholder={props.placeholder}/>
      </div>
    );
  };

  function LoginBox() {
    const { login } = useAuth();
    
    const handleSignUp = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      login(formData);
    };

    return (
      <div className={styles.loginBox}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <LoginInput fieldType="email" placeholder="Email" icon={ProfileIcon}/>
          <LoginInput fieldType="password" placeholder="Password" icon={LockIcon}/>
          <button className={styles.enterButton} type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className={styles.mainBody}>
        <section className={styles.desktopSection}>
          <div className={styles.centerSection}>
            <img src={SpiritIcon} alt="Spirit Icon" />
            <LoginBox />
          </div>
          <Footer />
        </section>
      </div>
    </AuthProvider>
  );
}