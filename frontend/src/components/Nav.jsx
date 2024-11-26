import React, { useState, useEffect } from "react";
import api from "../api"; // Ensure your API utility is properly imported.

const Nav = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await api.get("/api/token"); // Replace with the correct endpoint.
            setUsername(response.data.username);
        } catch (error) {
            console.error("Failed to fetch user info", error);
            alert("Failed to fetch user info");
        }
    };

    return (
        <nav>
            <p>Welcome, {username}!</p>
        </nav>
    );
};

export default Nav;
