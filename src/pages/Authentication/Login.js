import styles from './Login.module.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import LockIcon from '../../assets/LockIcon';
import Footer from '../../components/Footer/Footer';

export default function Login() {
  const [formData, setFormData] = useState({email: "", password: ""});

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setToken(data.token);
      setError("");
      console.log(token);
    } catch (err) {
      setError(err.message);
    };
  };

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/connection`);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        <form onSubmit={handleSignIn}>
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