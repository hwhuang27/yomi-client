import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './Login.jsx'
import Register from './Register.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/login'/>,
    // reroute to dashboard if user is logged in
  },
  {
    path: "/login",
    element: <Login />,
    // reroute to dashboard if user is logged in

  },
  {
    path: "/register",
    element: <Register />,
    // reroute to dashboard if user is logged in
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// pages:

// 1) login
// 2) register
// 3) user dashboard

// to-do:

// make components for login/register pages
// link the forms to backend - local storage for jwt?
// setup client-side routing
// style it 

// make component for dashboard
// make components for header / add book form / display book area
// link display books component to backend on render
// link add book form to backend
// style it
