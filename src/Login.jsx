import { Link } from "react-router-dom";


const Login = () => {
    return (
    <form action="/api/login" method="POST">
        <h1>Login</h1>

        <div className="form-content">
            <label for="username">Username</label>
            <input name="username" id="username" />

            <label for="password">Password</label>
            <input type="password" name="password" id="password" />

            <div className="btn-group">
                <button>Login</button>
                <Link to='/register' className="button">Sign Up</Link>
            </div>
        </div>    
    </form>
    );
};

export default Login;