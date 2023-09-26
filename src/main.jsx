import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './Login.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx'
import AddBook from './BookRoutes/AddBook.jsx'
import EditBook from './BookRoutes/EditBook.jsx'
import DeleteBook from './BookRoutes/DeleteBook.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/login'/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/book/new",
    element: <AddBook />
  },
  {
    path: "/book/edit/:id",
    element: <EditBook />
  },
  {
    path: "/book/delete/:id",
    element: <DeleteBook />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)