import React, { useState } from "react";
import { AuthProvider, useAuth } from '../../hooks/useSpiritAuth'; 

function TesterComponent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <div>You're authenticated</div> : <div>you're NOT authenticated</div>;
}

function Test() { 
  return (
    <AuthProvider>
      <TesterComponent />
    </AuthProvider>
  );
};

export default Test;



/*
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setToken(data.token);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setError("Registration successful! Please sign in.");
    } catch (err) {
      setError(err.message);
    };
  };

  const fetchProtectedData = async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/users/test_auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch protected data");
      }

      const data = await response.json();
      setProtectedData(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };
  */
