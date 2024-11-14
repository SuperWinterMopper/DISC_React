import { useState, useEffect, useMemo } from 'react';

export default function useFilteredUsers(searchQuery, sortStyle) {
  const [usersDisplayData, setUsersDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");
        const userData = await response.json();
        const temp = userData.map(user => ({
          key: user.id,
          username: user.firstName + " " + user.lastName,
          iconLink: user.profilePicture,
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