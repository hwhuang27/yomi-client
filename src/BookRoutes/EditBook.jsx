import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { decodeEntities } from '../helpers/decodeHTML.jsx';

function EditBook() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Finished");
    const [rating, setRating] = useState("-");
    const [notes, setNotes] = useState("");
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
                setStatus(data.book.status);
                setRating(data.book.rating);
                setNotes(decodeEntities(data.book.notes));
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
            if (title === "" || author === "" || status === "") {
                setError("Fields cannot be empty");
                throw new Error("Fields cannot be empty");
            }

            let res = await fetch(`https://bookshelf-api-production.up.railway.app/api/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title,
                    author,
                    status,
                    rating,
                    notes,
                    _id: id,
                }),
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
            <h1>Edit Book</h1>

            <div className="form-content">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name={title}
                    value={title}
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    name={author}
                    value={author}
                    id="author"
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label htmlFor="status">Status</label>
                <select name={status} value={status} id="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">--Please choose a status--</option>
                    <option value="Finished">Finished</option>
                    <option value="Reading">Reading</option>
                    <option value="Wishlist">Wishlist</option>
                    <option value="Dropped">Dropped</option>

                </select>
                
                <label htmlFor="rating">Rating</label>
                <select name={rating} value={rating} id="rating" onChange={(e) => setRating(e.target.value)}>
                    <option value="-">--Please choose a rating--</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>

                <label htmlFor="notes">Notes</label>
                <textarea
                    name={notes}
                    value={notes}
                    id="notes"
                    rows="3"
                    cols="30"
                    onChange={(e) => setNotes(e.target.value)}
                />

                <div className="error">
                    {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}
                </div>

                <div className="btn-group">
                    <button>Edit Book</button>
                    <Link to='/dashboard' className="button">Go Back</Link>
                </div>
            </div>

        </form>
    );
}

export default EditBook;
