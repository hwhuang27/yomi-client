import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { decodeEntities } from './helpers/decodeHTML.jsx';
import Book from './Book.jsx'


function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  let logout = () => {
    localStorage.clear();
    navigate('/login');
  } 

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
          // throw new Error(`HTTP Error: Status Code ${response.status}`);
          throw new Error(`Error: Token expired, login again.`);
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
      <h1>📚 Yomi 📚</h1>
      <h2>Welcome back, {localStorage.getItem('name')}.</h2>
      <Link to="/book/new" className="link-btn">Add Book</Link>
      <button className="button" onClick={logout}>Logout</button>

      {loading && <h2>One moment...</h2>}
      {error && (
        <h2>{`There was a problem fetching the post data - ${error}`}</h2>
      )}

      {books.length === 0 ? <h2>Your bookshelf is empty!</h2> :
      <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Status</th>
              <th scope="col">Rating</th>
              <th scope="col">Notes</th>
              <th scope="col">Date Added</th>
              <th scope="col">&nbsp;</th>
              <th scope="col">&nbsp;</th>
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
