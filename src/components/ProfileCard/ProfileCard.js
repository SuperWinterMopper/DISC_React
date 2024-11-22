import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const Profile = React.memo(function Profile({ username, matchness, iconLink, isFollowed, followChange }) {
  
  const changeFollow = useCallback(() => {
    followChange( username, isFollowed, {username, matchness, iconLink});
  }, [username, isFollowed, matchness, iconLink, followChange]);
  
  const getMatchnessColor = useCallback((matchness) => {
    if (matchness >= 80) return "plus-80-match";
    else if (matchness >= 40) return "plus-40-match";
    else return "minus-40-match";  
  }, []);

  return (
    <div className="user" id={isFollowed ? "followedUser" : ""}>
      <Link to={`/profile/${username}`}>
        <div className='user-icon'>
          <img src={iconLink} alt="User Icon"/>
        </div>
      </Link>
      <div className="user-info">
        <h3>{username}</h3>
        <h4 id={getMatchnessColor(matchness)}>{matchness}% match</h4>
      </div>
      <button className="follow-button" id={isFollowed ? "followed" : "unfollowed"} onClick={changeFollow}>
        {isFollowed ? "Following" : "Follow"}
      </button>
    </div>
  );
});

export default Profile;