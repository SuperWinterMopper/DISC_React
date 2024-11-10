import './Profile.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function Profile() {
    const params = useParams();
    return (
        <h1>Profile {params.profileID}</h1>
    );
}