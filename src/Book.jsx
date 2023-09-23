import { useState } from 'react'
import { Link } from "react-router-dom";

function Book({id, title, author, status, rating, notes, date_added}) {
    return (
        <tr>
            <td>{title}</td>
            <td>{author}</td>
            <td>{status}</td>
            <td>{rating}</td>
            <td>{notes}</td>
            <td>{date_added}</td>
            <td><Link to={`/book/edit/${id}`}>Edit</Link></td>
            <td><Link to={`/book/delete/${id}`}>Delete</Link></td>
        </tr>
    );
}

export default Book;
