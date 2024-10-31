import './App.css';
import React, { useState, useEffect } from "react";

  const users = [
  {username: "lisa", matchness: 29, iconLink: "https://resources.tidal.com/images/0c3de7f6/d0a6/4d51/8344/1f110bfd8c27/320x320.jpg"},
  {username: "jesuscrhistthethird", matchness: 81, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/86799671/a18c/4a8b/935a/3f7e1ac97f39/640x640.jpg"},
  {username: "The Scream", matchness: 86, iconLink: "https://resources.tidal.com/images/2fa97549/1898/494f/a4bc/0e09d0a25a6e/640x640.jpg"},
  {username: "pepsi man", matchness: 9, iconLink: "https://resources.tidal.com/images/e5685e43/c607/4a8a/8bec/86a9dd5648ad/320x320.jpg"},
  {username: "amazingella", matchness: 92, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/6b95de51/316d/4c53/9f10/5261a9e3bac0/640x640.jpg"},
  {username: "fred", matchness: 74, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/6cdffdfa/3819/4fcb/b961/56da72a7f3db/640x640.jpg"},
  {username: "selectperson", matchness: 52, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/96b5aae4/33ff/4ff7/9d84/fe3a6f17137b/640x640.jpg"},
  {username: "lovely user #4", matchness: 46, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/c6448675/7103/45f3/a1d2/6085f3b5f59e/640x640.jpg"},
  {username: "acton healy", matchness: 96, iconLink: "https://resources.tidal.com/images/0843b27b/4466/4c7f/bfd6/4df4507cdf2a/640x640.jpg"},
  {username: "saratiqqqqqqqqqqqqqqqqqqqqqqqqqq", matchness: 34, follow: "unfollowed", iconLink: "https://resources.tidal.com/images/17024b49/483a/418f/af81/b5bc8cbb5469/320x320.jpg"},
  {username: "British Person 400", matchness: 64, iconLink: "https://resources.tidal.com/images/2398c977/48e5/44da/97c2/25da8c9c1869/640x640.jpg"},
  {username: "wong bb", matchness: 20, iconLink: "https://resources.tidal.com/images/c428fcef/c562/42d7/b083/1d4749145515/640x640.jpg"},  
  {username: "Ashley", matchness: 13, iconLink: "https://resources.tidal.com/images/04733d83/e129/4c23/974d/8686e0f68ab5/640x640.jpg"},
  {username: "texas cowboy", matchness: 23, iconLink: "https://resources.tidal.com/images/116aec03/a6e8/4a73/ab1e/60e99bdd079e/640x640.jpg"},
  {username: "vocoder", matchness: 7, iconLink: "https://resources.tidal.com/images/12710f00/26e3/475d/bef0/3cda307be41e/640x640.jpg"},
  {username: "Octillo", matchness: 62, iconLink: "https://resources.tidal.com/images/3009543d/652a/4ab4/ad79/c636323a63cd/640x640.jpg"}]

function App() {
  const [currentPage, setCurrentPage] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [sortStyle, setSortStyle] = useState("Descending")

  useEffect(() => {
    let filtered = users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()));
    if(sortStyle === "Descending") {
      filtered.sort((a, b) => b.matchness - a.matchness);
    } else {
      filtered.sort((a, b) => a.matchness - b.matchness);
    }
    setFilteredUsers(filtered);
  }, [searchQuery, sortStyle]); 
  
  function spiritIcon() {
    return (
      <figure className="spirit-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35.5" cy="35.5" r="35.5" fill="#FFBD12"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
            <path d="M29.6609 0.199997H13.3395L0.200195 13.3393V29.6607L13.3395 42.8H29.6609L42.8002 29.6607V13.3393L29.6609 0.199997ZM15.5978 29.866L7.18045 21.4487L15.5978 13.0313C18.78 9.84915 24.0152 9.84915 27.1973 13.0313L35.6147 21.4487L27.1973 29.866C24.0152 33.0482 18.8826 33.0482 15.5978 29.866Z" fill="#201B21"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17" viewBox="0 0 11 17" fill="none">
            <path d="M0.943001 4.32875H0.766602V7.19834H4.23575C4.55915 7.19834 4.67675 7.64209 4.38275 7.79L3.70656 8.11542C2.79517 8.55917 1.88379 8.79583 0.943001 8.79583H0.766602V11.6654H4.14756C4.47095 11.6654 4.58855 12.1092 4.29455 12.2571L3.58897 12.5825C2.73638 12.9967 1.82499 13.2037 0.943001 13.2037H0.766602V16.0733H4.14756L4.52975 15.6C6.17613 13.6771 8.0871 12.6713 10.0863 12.6713H10.2333V9.80167H6.85231C6.52892 9.80167 6.41132 9.35791 6.70532 9.21L7.41091 8.88458C8.2635 8.47042 9.17489 8.26333 10.0569 8.26333H10.2039V5.39375H6.76412C6.44072 5.39375 6.32312 4.95 6.61712 4.80208L7.29331 4.47667C8.2047 4.03292 9.11609 3.79625 10.0569 3.79625H10.2039V0.926666H6.82292L6.44072 1.4C4.85314 3.32292 2.91277 4.32875 0.943001 4.32875Z" fill="#201B21"/>
        </svg>                                    
      </figure>
    )
  }
  function profileIcon() {
    return( 
      <figure className="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
              <circle cx="21.5" cy="21.5" r="20" fill="#EEEFF4" stroke="#474A57" stroke-width="2"/>
          </svg>  
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M20.6663 21.6875C20.6663 18.8685 17.01 16.5833 12.4997 16.5833C7.98935 16.5833 4.33301 18.8685 4.33301 21.6875M12.4 13.5208C9.68072 13.5208 7.39551 11.2356 7.39551 8.41667C7.39551 5.59771 9.68072 3.3125 12.4997 3.3125C15.3186 3.3125 17.6038 5.59771 17.6038 8.41667C17.6038 11.2356 15.3186 13.5208 12.4997 13.5208Z" stroke="#474A57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </figure>
    )
  }
  function searchIcon() {
    return (
      <figure className="nav-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
              <g clip-path="url(#clip0_127_460)">
              <rect x="1.5" y="1.5" width="39" height="40" rx="7" fill="#FFBD12" stroke="#18191F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_127_460">
                  <rect width="42" height="42" fill="white" transform="translate(0.5 0.5)"/>
              </clipPath>
              </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path d="M13.25 13.75L19.375 19.875M8.14583 15.7917C4.1993 15.7917 1 12.5924 1 8.64583C1 4.6993 4.1993 1.5 8.14583 1.5C12.0924 1.5 15.2917 4.6993 15.2917 8.64583C15.2917 12.5924 12.0924 15.7917 8.14583 15.7917Z" stroke="#18191F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </figure>
    )
  }
  function messageIcon() {
    return (
      <figure className="nav-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <g clip-path="url(#clip0_127_470)">
            <circle cx="21" cy="21.8462" r="20" fill="#EEEFF4" stroke="#18191F" stroke-width="2"/>
        </g>
        <defs>
            <clipPath id="clip0_127_470">
                <rect width="43.5292" height="43.3846" fill="white" transform="translate(0 0.615402)"/>
            </clipPath>
        </defs>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <g clip-path="url(#clip0_106_34)">
                <path d="M12.9157 6.99992H3.84115" stroke="#474A57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.9158 7.00003L1.77891 12.3623L3.8413 7.00003L1.77891 1.6378L12.9158 7.00003Z" stroke="#474A57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_106_34">
                    <rect width="14" height="14" fill="white" transform="translate(0.5)"/>
                </clipPath>
            </defs>
        </svg>  
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <circle cx="7.5" cy="7" r="6" fill="#F95A2C" stroke="white" stroke-width="2"/>
        </svg>    
      </figure>
    )
  }
  function sortAscendingIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 17H16M4 12H13M4 7H10M18 13V5M18 5L21 8M18 5L15 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }
  function sortDescendingIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 17H10M4 12H13M18 11V19M18 19L21 16M18 19L15 16M4 7H16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    )
  }
  function magnifyingGlassIcon() {
    return (
      <div className="magnifying-glass">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#18191F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.9999 21L16.6499 16.65" stroke="#18191F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>                        
      </div>
    )
  }
  function changeSort() {
    if(sortStyle === "Descending") setSortStyle("Ascending");
    else setSortStyle("Descending");
  }
  
  function searchFieldContent() {
    return ( 
      <div className="search-field">
        <h1>Search</h1>
        <div className="search-bar">
            <button className="sort-icon" onClick={changeSort}>{sortStyle === "Descending" ? sortDescendingIcon() : sortAscendingIcon()}</button>
            <input type="text" placeholder="Search based on your preferences..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
            {magnifyingGlassIcon()}
        </div>
        <div className="recommended" id={searchQuery === "" ? "" : "hidden"}><h2>Recommended:</h2></div>  
      </div> 
    )
  }
  function navbarButton(props) {
    return ( 
      <button>
        {props.icon}
        <p id={props.text === currentPage ? "selected" : ""}>{props.text}</p>
      </button>
    )
  }

  function user(props) {
    const isFollowed = followedUsers.some(u => u.username === props.username);
    let matchness = "minus-40-match"
    if(props.matchness >= 80) matchness = "plus-80-match";
    else if(props.matchness >= 40) matchness = "plus-40-match";

    const changeFollow = () => {
      if(followedUsers.some(u => u.username === props.username)) 
        setFollowedUsers(followedUsers.filter(u => u.username !== props.username))
      else {
        setFollowedUsers([ ...followedUsers, {
          username: props.username, 
          matchesss: props.matchness,
          iconLine: props.iconLink
        }])  
      }
    }

    return (
      <div className="user" id={isFollowed ? "followedUser" : ""}>
        <img className="user-icon" src={props.iconLink} alt="User Icon"/>
        <div className="user-info">
            <h3>{props.username}</h3>
            <h4 id={matchness}>{props.matchness}% match</h4>
        </div>
        <button className="follow-button" id={isFollowed ? "followed" : "unfollowed"} onClick={changeFollow}>
          {isFollowed ? "Following" : "Follow"}
        </button>
      </div>
    )
  }

  return (
    <body>
      <section className='desktop-section'>
        <nav-bar>
          {spiritIcon()}
          {navbarButton({ text: "Profile", icon : profileIcon()})}
          {navbarButton({ text: "Search", icon : searchIcon()})}
          {navbarButton({ text: "Message", icon : messageIcon()})}
        </nav-bar>
        <section className='search-container'>
          {searchFieldContent()}
          <div className="users-field">
            {filteredUsers.map(u => user({u: u, username: u.username, matchness: u.matchness, iconLink : u.iconLink}))}
          </div>
        </section>
        <footer>
          <h5>Spirit</h5>
        </footer>
      </section>
    </body>
  ); 
}

export default App;