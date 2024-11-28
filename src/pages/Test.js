import { useFetcher } from 'react-router-dom';
import './Profile.css';
import React, { useState, useEffect } from "react";
import NoResultsBox from '../components/NoResultsBox';

export default function Test() {
    const fetchUsers = async () => {
        try {
            const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");
            const json = await response.json();
            console.log(json);  
        } catch (error) {
            console.log("My stupid error message: " + error.message);
        }
    };

    async function fetchUserByID(props) {
        try {
            const response = await fetch(`https://disc-assignment-5-users-api.onrender.com/api/users/${props.userID}`);
            const json = await response.json();
            console.log(json.firstName);
        } catch(error) {
            console.log("Error fetching user: " + error.message);
        }
    }   

    return (
        // <button onClick={() => fetchUserByID({userID : 16})}>get id=16 user</button>
        <NoResultsBox/>
    );
}