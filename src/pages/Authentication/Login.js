import styles from './Login.module.css'
import React, { useCallback, useState } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import LockIcon from '../../assets/LockIcon';
import Footer from '../../components/Footer/Footer';
import { AuthProvider, useAuth } from '../../hooks/useAuth'; 

export default function Login() {
  const [token, setToken] = useState("");

  function LoginInput(props) {
    return ( 
      <div className={styles.inputFieldBox}>
        <props.icon />
        <input type={props.fieldType} name={props.fieldType}  placeholder={props.placeholder}/>
      </div>
    );
  };

  function AuthBlue() {
    const { isAuthenticated } = useAuth();
    if(isAuthenticated) return (<div>AUTHENTICATED</div>)
    else return (<div>YOU AINT AUTHENTICATED</div>);
  }

  function LoginBox() {
    const { login } = useAuth();
    const handleSignIn = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: formData.get("email"), password: formData.get("password")}),
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setToken(data.token);
        const temp_user = {
          first_name: "Jack",
          last_name: "Day",
          email: "jack@gamil.com",
          profile_icon: "https://resources.tidal.com/images/2eaf0497/bcbd/45d5/bf9b/4e83e23b53b0/640x640.jpg",
          followers: ["4","5","6"],
          following: ["4","5","6"],
          artist_tags: ["ABBA", "Kate Bush", "Gentle Giant"],
          genre_tags: ["Prog Rock", "Art Pop"],
          bio: "I like LOBSTERS."
        };
        login(temp_user, data.token);
      } catch (err) {
        console.log(err.message);
      };
    };

    return (
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSignIn}>
          <LoginInput fieldType="email" placeholder="Email" icon={ProfileIcon}/>
          <LoginInput fieldType="password" placeholder="Password" icon={LockIcon}/>
          <button className={styles.enterButton} type="submit">Sign In</button>
          <AuthBlue />
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
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