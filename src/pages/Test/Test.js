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
  function AuthBlue() {
    const { isAuthenticated } = useAuth();
    if(isAuthenticated) return (<div>AUTHENTICATED</div>)
    else return (<div>YOU AINT AUTHENTICATED</div>);
  }

  function WordBox() {
    const { login } = useAuth();
    return (
      <div>
        <p>Hello, this is WordBox</p>
        <AuthBlue />
      </div>
    );
  };


  return (
    <AuthProvider>
      <WordBox />
    </AuthProvider>
  );
};