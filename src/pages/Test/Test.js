import React, { useState, useEffect } from "react";
import NoResultsBox from '../../components/NoResultsBox/NoResultsBox';

export default function Test() {
  const [token, setToken] = useState("");
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    return (
      <div>
        Hello world
        <NoResultsBox/>
      </div>
    
  );
}