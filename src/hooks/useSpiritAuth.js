import { useState, children, createContext, useContext } from "react";

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

  function login(userData, authToken) {
    setUser(userData);
    setToken(authToken);
  }

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
      isAuthenticated: !(user === empty_user)
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