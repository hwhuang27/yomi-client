import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/login'/>,
  },
  {
    path: "/login",
    element: <Login />,
    // reroute to dashboard if user is logged in (localStorage)
  },
  {
    path: "/register",
    element: <Register />,
    // reroute to dashboard if user is logged in (localStorage)
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    // reroute to login page if user is NOT logged in (localStorage)
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)