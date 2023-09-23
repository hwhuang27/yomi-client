import { useState } from 'react'
import { Link } from "react-router-dom";
import './App.css'
import Book from './Book.jsx'

function Dashboard() {
  const isEmpty = () => {
    return Object.keys(data).length === 0;
  }

  const example = {
    id: '1',
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    status: 'Finished',
    rating: '10',
    notes: `he's just like me fr`,
    date_added: '09-22-2023',
  };

  const data = [];
  data.push(example);

  return (
    <div>
      <h1>Bookshelf</h1>
      <h2>Welcome back, [username / first name]</h2>
      <Link to="/book/new" className="button">Add New Book</Link>

      {isEmpty(data) &&
        <h2>Your bookshelf is empty!</h2>
      }

      {!isEmpty(data) && 
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Notes</th>
              <th>Date Added</th>
            </tr>
          </thead>

          <tbody>
          {data.map((book) => {
            return <Book
              key={book.id}
              title={book.title}
              author={book.author}
              status={book.status}
              rating={book.rating}
              notes={book.notes}
              date_added={book.date_added}
            ></Book>
          })}
          </tbody>

        </table>
      }

    </div>
  );
}

export default Dashboard;
