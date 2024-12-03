import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = React.memo(function Profile({ user, followedUsers, followChange }) {
  
  const username = user.username;
  const matchness = user.matchness;
  const iconLink = user.iconLink;
  const isFollowed = followedUsers.some(followed => followed.username === user.username);

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
      <Link to={`/otherprofile/${username}`}>
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

export default ProfileCard;