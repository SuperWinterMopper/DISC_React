import { Link } from 'react-router-dom';
import SpiritIcon from '../../assets/SpiritIcon/SpiritIcon';
import ProfileIcon from '../../assets/ProfileIcon/ProfileIcon';
import SearchIcon from '../../assets/SearchIcon/SearchIcon';
import MessageIcon from '../../assets/MessageIcon/MessageIcon';
import ProfileIconSelected from '../../assets/ProfileIcon/ProfileIconSelected';
import SearchIconSelected from '../../assets/SearchIcon/SearchIconSelected';  
import MessageIconSelected from '../../assets/MessageIcon/MessageIconSelected';
import styles from './NavigationBar.module.css'

export default function NavigationBar({ currentPage }) {
  const NavbarButton = (props) => {
    let icon = <SpiritIcon/>;
    if(props.text === "Search") {icon = currentPage === "Search" ? <SearchIconSelected/> : <SearchIcon/>;}
    else if(props.text === "Profile") {icon = currentPage === "Profile" ? <ProfileIconSelected/> : <ProfileIcon/>;}
    else {icon = currentPage === "Message" ? <MessageIconSelected/> : <MessageIcon/>;}

    return ( 
      <Link to={props.to} className={styles.navBarLink}>
        <button>
          {icon}
          <p id={props.text === currentPage ? "selected" : ""}>{props.text}</p>
        </button>
      </Link>
    );
  };

  return (
    <nav-bar>
      <SpiritIcon />
      <NavbarButton text="Search" to="/" />       
      <NavbarButton text="Profile" to="/Me" />       
      <NavbarButton text="Message" to="/Message" />     
    </nav-bar>
  );
};