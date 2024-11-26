import React, { useState, useEffect } from "react";

const [username, setUsername] = useState("");

useEffect(() => {
    getUserInfo();
}, []);

const getUserInfo = () => {
    api.get("/api/token/")
        .then((res) => setUsername(res.data.username))
        .catch((err) => alert("Failed to fetch user info"));
};

const Nav = () => {
    return (
        <Nav>
            {username}
        </Nav>

    )

}

export default Nav