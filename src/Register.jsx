import { Link } from "react-router-dom";
import './App.css'


const Register = () => {
    return (
        //<form action="https://bookshelf-api-production.up.railway.app/api/register" method="POST">
        <form action="/api/register" method="POST">
        <h1>Register</h1>

        <div className="form-content">
                <label for="first_name">First Name</label>
                <input name="first_name" id="first_name" />

                <label for="last_name">Last Name</label>
                <input name="last_name" id="last_name" />

                <label for="username">Username</label>
                <input name="username" id="username" />

                <label for="password">Password</label>
                <input type="password" name="password" id="password" />

                <label for="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" id="confirm-password" />

            <div className="btn-group">
                <button>Register</button>
                <Link to='/login' className="button">Go Back</Link>
            </div>
        </div>

    </form>
    );
};

export default Register;