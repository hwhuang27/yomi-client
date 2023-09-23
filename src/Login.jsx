import { useState } from "react";
import { redirect, Link, Navigate } from "react-router-dom";
import './App.css'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || password === "") {
                setErrMsg("Fields cannot be empty");
                throw new Error("Fields cannot be empty");
            }
            
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
            let result = await res.json();
            
            if (res.status === 200) {
                setErrMsg("");
                localStorage.setItem("token", result.token);
                localStorage.setItem("username", result.body.username);
                localStorage.setItem("userId", result.body._id);
                console.log(result.token);
            } else if (res.status === 403) {
                setErrMsg("Invalid username or password");
            } else {
                setErrMsg("Server error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {/* Redirect to Dashboard */}
            {localStorage.getItem("token") && (
                <Navigate to="/dashboard" replace={true} />
            )}

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
                        {errMsg ? <p style={{ color: "#ef4444" }}>{errMsg}</p> : null}
                    </div>
                    <div className="btn-group">
                        <button>Login</button>
                        <Link to='/register' className="button">Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;