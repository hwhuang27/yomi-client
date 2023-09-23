import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Book from './Book.jsx'
import './App.css'

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  let logout = () => {
    localStorage.clear();
    navigate('/login');
  } 
  
  const decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    const element = document.createElement('div');
    function decodeHTMLEntities(str) {
      if (str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
    }
    return decodeHTMLEntities;
  })();

  // fetch all books from user
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(`https://bookshelf-api-production.up.railway.app/api/books`,
          {
            method: "GET",
            headers: {
              "Authorization": `bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (!response.ok){
          throw new Error(`HTTP Error: Status Code ${response.status}`);
        }
        let data = await response.json();
        
        // cleanup data
        await data.books.map((book) => {
          // unescape HTML characters
          book.title = decodeEntities(book.title);
          book.author = decodeEntities(book.author);
          book.notes = decodeEntities(book.notes);
          
          // change date formatting
          let date = new Date(book.date_added);
          book.date_added = `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`
        
          return book;
        })

        setBooks(data.books);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  return (
    <div>
      <h1>📚 Bookshelf 📚</h1>
      <h2>Welcome back, {localStorage.getItem('name')}</h2>
      <Link to="/book/new" className="button">Add New Book</Link>
      <button onClick={logout}>Logout</button>

      {loading && <h2>One moment...</h2>}
      {error && (
        <h2>{`There was a problem fetching the post data - ${error}`}</h2>
      )}

      {books.length === 0 ? <h2>Your bookshelf is empty!</h2> :
      <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Notes</th>
              <th>Date Added</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return <Book
                key={book._id}
                id={book._id}
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
