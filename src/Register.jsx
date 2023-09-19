import { Link } from "react-router-dom";
import './App.css'


const Register = () => {
    return (
    <form action="/api/register" method="POST">
        <div>
            <label for="first_name">First Name</label>
            <input name="first_name" id="first_name" />
        </div>
        <div>
            <label for="last_name">Last Name</label>
            <input name="last_name" id="last_name" />
        </div>
        <div>
            <label for="username">Username</label>
            <input name="username" id="username" />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>
        <div>
            <button>Register</button>
        </div>
        <Link to='/login' className="button">Go Back</Link>
    </form>
    );
};

export default Register;