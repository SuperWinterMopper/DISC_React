import { useState, useEffect, useMemo } from 'react';

export default function useFilteredUsers(searchQuery, sortStyle) {
  const [usersDisplayData, setUsersDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users`);
        const userData = await response.json();
        console.log(userData);
        const temp = userData.map(user => ({
          key: user.id,
          username: user.first_name + " " + user.last_name,
          iconLink: user.profile_icon,
          artist_tags: user.artist_tags,
          genre_tags: user.genre_tags,
          email: user.email,
          followers: user.followers,
          follwing: user.following,
          //matchness is random for NOW, will find way to calculate
          matchness: Math.floor(Math.random() * 101),
        }));
        setUsersDisplayData(temp);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    fetchAllUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = usersDisplayData.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortStyle === "Descending") {
      filtered.sort((a, b) => b.matchness - a.matchness);
    } else {
      filtered.sort((a, b) => a.matchness - b.matchness);
    }
    return filtered;
  }, [usersDisplayData, searchQuery, sortStyle]);

  return { filteredUsers, loading };
}