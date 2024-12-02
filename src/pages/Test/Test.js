// import React, { useState } from "react";
// import { AuthProvider, useAuth } from '../../hooks/useSpiritAuth'; 

// function TesterComponent() {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <div>You're authenticated</div> : <div>you're NOT authenticated</div>;
// }

// function Test() { 
//   return (
//     <AuthProvider>
//       <TesterComponent />
//     </AuthProvider>
//   );
// };

// export default Test;

import styles from '../Authentication/Login.module.css';
import React, { useState, useCallback, useMemo } from "react";
import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIconSVG.svg';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIconSVG';
import LockIcon from '../../assets/LockIcon';
import Footer from '../../components/Footer/Footer';
import { AuthProvider, useAuth } from '../../hooks/useAuth'; 

export default function Login() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [token, setToken] = useState("");
  const { login } = useAuth();

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
    <AuthProvider>
      <div className={styles.mainBody}>
        <section className={styles.desktopSection}>
          <div className={styles.centerSection}>
            <img src={SpiritIcon} alt="Spirit Icon" />
            <div className={styles.loginBox}>
              <h1>Login</h1>
              <form onSubmit={handleSignIn}>
                {loginInput({fieldType: "email", data: formData.email, placeholder: "Email", icon: ProfileIcon})}
                {loginInput({fieldType: "password", data: formData.password, placeholder: "Password", icon: LockIcon})}
                <button className={styles.enterButton} type="submit">Sign In</button>
              </form>
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </AuthProvider>
  );
}