import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/index.css"
import LoadingIndicator from "./LoadingIndicator";
import Nav from "./Nav";
import wave from "../assets/wave.svg"

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()
    const name = method === "login" ? "Login" : "Register"
    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username,password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else{
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return <div className="layout">
    <Nav />
    <div className="intro" >
    <h1> Take Control of <span className="accent">Your Money</span></h1>
    <p>Take control of your money, unlock your freedom. Your journey starts here!</p>
    </div>
    <div className="login-container">
        <form onSubmit={handleSubmit}>
            <div className="login-box">
            <span>{name}</span> 
            <div>
            <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            </div>
            <div>
                <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            </div>
            {loading && <LoadingIndicator/>}
            <button className="btn btn--dark" type="submit">
                {name}
            </button>
            </div>
        </form>

    </div>

<img src={wave} atl=""/>
 </div >

}

export default Form