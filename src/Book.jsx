import { useState } from 'react'
import { Link } from "react-router-dom";
import './App.css'

function Book({title, author, status, rating, notes, date_added}) {
    return (
        <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{status}</td>
            <td>{rating}</td>
            <td>{notes}</td>
            <td>{date_added}</td>
            <a href="/book/edit">Edit</a>
            <a href="/book/delete">Delete</a>
        </tr>
    );
}

export default Book;
