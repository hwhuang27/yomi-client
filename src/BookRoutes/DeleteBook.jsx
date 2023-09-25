import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { decodeEntities } from '../helpers/decodeHTML.jsx';

function DeleteBook() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    // fetch book data with params id and populate fields
    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await fetch(`https://bookshelf-api-production.up.railway.app/api/books/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                if (!response.ok) {
                    // throw new Error(`HTTP Error: Status Code ${response.status}`);
                    throw new Error(`Error: Token expired, login again.`);
                }
                let data = await response.json();

                setTitle(decodeEntities(data.book.title));
                setAuthor(decodeEntities(data.book.author));
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }
        getBook();
    }, []);


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`https://bookshelf-api-production.up.railway.app/api/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.status === 200) {
                setError("");
                navigate("/dashboard");
            } else if (res.status === 400) {
                setError("Something went wrong");
            } else {
                setError("Server error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Delete Book</h1>

            <div className="form-content">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name={title}
                    value={title}
                    id="title"
                    readOnly
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    name={author}
                    value={author}
                    id="author"
                    readOnly
                />

                <div className="error">
                    {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}
                </div>

                <div>
                    <h3>Are you sure you want to delete this book?</h3>
                </div>
                <div className="btn-group">
                    <button>Delete Book</button>
                    <Link to='/dashboard' className="button">Go Back</Link>
                </div>
            </div>

        </form>
    );
}

export default DeleteBook;
