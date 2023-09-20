import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css'


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://bookshelf-api-production.up.railway.app/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            let resJson = await res.json();
            console.log(resJson);
            if (res.status === 200) {
                setUsername("");
                setPassword("");
            } else if (res.status === 403) {
                setErrMsg("Wrong username or password");
            } else if (res.status === 400) {
                setErrMsg("Fields cannot be empty");
            } else {
                setErrMsg("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-content">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="message">
                {errMsg ? <p style="color: #ef4444">{errMsg}</p> : null}
            </div>
            <div className="btn-group">
                <button>Login</button>
                <Link to='/register' className="button">Sign Up</Link>
            </div>
        </div>    
    </form>
    );
};

export default Login;