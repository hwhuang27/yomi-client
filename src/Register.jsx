import { useState } from "react";
import { redirect, Link, Navigate } from "react-router-dom";
import './App.css'

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [regMsg, setRegMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (firstName === "" || lastName === "" || username === "" || password === "" || confirmPass === "") {
                setErrMsg("Fields cannot be empty");
                throw new Error("Fields cannot be empty");
            } else if (password !== confirmPass) {
                setErrMsg("Passwords don't match");
                throw new Error("Passwords don't match");
            }    

            let res = await fetch("https://bookshelf-api-production.up.railway.app/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    password: password,
                    confirm_password: confirmPass,
                }),
            });
            
            if(res.status === 200){
                setErrMsg("");
                setRegMsg(`User ${username} registered!`);
            } else if( res.status === 400) {
                setRegMsg("");
                setErrMsg("Username already registered");
            } else {
                setErrMsg("Server error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="form-content">
            <label htmlFor="first_name">First Name</label>
            <input 
                type="text"
                name={firstName}
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="last_name">Last Name</label>
            <input
                type="text"
                name={lastName}
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
            />

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

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                type="password"
                name={confirmPass}
                id="confirm-password"
                onChange={(e) => setConfirmPass(e.target.value)}
            />

            <div className="errMsg">
                {regMsg ? (
                // <p style={{color: "#22c55e"}}>{regMsg}</p>
                <Navigate to="/login" replace={true} />
                ) : null}
                {errMsg ? <p style={{ color: "#ef4444"}}>{errMsg}</p> : null}
            </div>

            <div className="btn-group">
                <button>Register</button>
                <Link to='/login' className="button">Go Back</Link>
            </div>
        </div>

    </form>
    );
};

export default Register;