import { useState, createContext, useContext, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setToken(session.access_token);
          setIsAuthenticated(true);
        } else {
          setUser(empty_user);
          setToken(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication verification failed:', error);
        setUser(empty_user);
        setToken(null);
        setIsAuthenticated(false);
      } 
    };

    verifyAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user);
          setToken(session.access_token);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(empty_user);
          setToken(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (userData) => {
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
          email: userData.get("email"),
        };
        setUser(temp_user);
        setToken(data.token);  
        setIsAuthenticated(true); 
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
      isAuthenticated,
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