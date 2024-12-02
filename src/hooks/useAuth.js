import { useState, children, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const empty_user = {
    first_name: "",
    last_name: "",
    email: "",
    profile_icon: "",
    followers: [""],
    following: [""],
    artist_tags: [""],
    genre_tags: [""],
    bio: ""
  };
  const [user, setUser] = useState(empty_user);
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log("User: ", user);
    console.log("Token: ", token);
  }, [user, token])

  // function login(userData, authToken) {
  //   setUser(userData);
  //   setToken(authToken);
  // }

  const login = async (userData, authToken) => {
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: userData.get("email"), password: userData.get("password")}),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      else {
        const temp_user = {
          first_name: "Jack",
          last_name: "Day",
          email: userData.get("email"),
          profile_icon: "https://resources.tidal.com/images/2eaf0497/bcbd/45d5/bf9b/4e83e23b53b0/640x640.jpg",
          followers: ["4","5","6"],
          following: ["4","5","6"],
          artist_tags: ["ABBA", "Kate Bush", "Gentle Giant"],
          genre_tags: ["Prog Rock", "Art Pop"],
          bio: "I like LOBSTERS."
        };
        setUser(temp_user);
        setToken(authToken);  
      }
    } catch (err) {
      console.log(err.message);
    };
  };

  function logout() {
    setUser(empty_user);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{
      user, 
      token, 
      login, 
      logout,
      isAuthenticated: user !== empty_user
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}