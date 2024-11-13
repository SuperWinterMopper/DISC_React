import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const Profile = React.memo(function Profile({ username, matchness, iconLink, isFollowed, getMatchnessColor, followChange }) {
  const matchnessColor = getMatchnessColor(matchness);

  const changeFollow = useCallback(() => {
    followChange( username, isFollowed, {username, matchness, iconLink});
  }, [username, isFollowed, matchness, iconLink, followChange]);

  return (
    <div className="user" id={isFollowed ? "followedUser" : ""}>
      <Link to={`/profile/${username}`}>
        <div className='user-icon'>
          <img src={iconLink} alt="User Icon"/>
        </div>
      </Link>
      <div className="user-info">
        <h3>{username}</h3>
        <h4 id={matchnessColor}>{matchness}% match</h4>
      </div>
      <button className="follow-button" id={isFollowed ? "followed" : "unfollowed"} onClick={changeFollow}>
        {isFollowed ? "Following" : "Follow"}
      </button>
    </div>
  );
});

export default Profile;