import styles from './Login.module.css'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import LockIcon from '../../assets/LockIcon';
import Footer from '../../components/Footer/Footer';

export default function Login() {
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
        <input type={props.fieldType} name={props.fieldType} value={props.data} onChange={handleChange} placeholder={props.placeholder}/>
      </div>
    );
  };
  
  function loginBox() {
    return (
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {loginInput({fieldType: "email", data: formData.email, placeholder: "Email", icon: ProfileIcon})}
          {loginInput({fieldType: "password", data: formData.password, placeholder: "Password", icon: LockIcon})}
          <button className={styles.enterButton} type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    );
  }; 

  return (
    <div className={styles.mainBody}>
      <section className={styles.desktopSection}>
        <div className={styles.centerSection}>
          <img src={SpiritIcon} alt="Spirit Icon" />
          {loginBox()}
        </div>
        <Footer />
        </section>
    </div>
  );
};