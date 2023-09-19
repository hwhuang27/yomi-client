import { Link } from "react-router-dom";
import './App.css'


const Login = () => {
    return (
    <form action="/api/login" method="POST">
        <div>
            <label for="username">Username</label>
            <input name="username" id="username" />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>
        <div>
            <button>Login</button>
        </div>
        <Link to='/register' className="button">Register</Link>
    </form>
    );
};

export default Login;