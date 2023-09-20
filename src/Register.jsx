import { useState } from "react";
import { Link } from "react-router-dom";
import './App.css'

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            let resJson = await res.json();
            console.log(resJson);
            if(res.status === 200){
                setFirstName("");
                setLastName("");
                setUsername("");
                setPassword("");
                setConfirmPass("");
                setMessage(`User ${username} registered!`);
            } else if( res.status === 400) {
                setMessage("Empty fields or username already registered");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        //<form action="https://bookshelf-api-production.up.railway.app/api/register" method="POST">
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

            <div className="message">
                {message ? <p>{message}</p> : null}
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