import { useState } from 'react'
import { Link } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to="login" className="button">Login page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App
