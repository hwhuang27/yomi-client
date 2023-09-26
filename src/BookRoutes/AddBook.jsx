import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Finished");
    const [rating, setRating] = useState("-");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");

    let navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (title === "" || author === "" || status === "" ) {
                setError("Fields cannot be empty");
                throw new Error("Fields cannot be empty");
            }

            let res = await fetch("https://bookshelf-api-production.up.railway.app/api/books", {
                method: "POST",
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
            <h1>Add Book</h1>

            <div className="form-content">
                <label htmlFor="title">Title (required)</label>
                <input
                    type="text"
                    name={title}
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="author">Author (required)</label>
                <input
                    type="text"
                    name={author}
                    id="author"
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label htmlFor="status">Status (required)</label>
                <select name={status} id="status" onChange={(e) => setStatus(e.target.value)}>
                    <option value="">--Please choose a status--</option>
                    <option value="Finished">Finished</option>
                    <option value="Reading">Reading</option>
                    <option value="Wishlist">Wishlist</option>
                    <option value="Dropped">Dropped</option>
                </select>

                <label htmlFor="rating">Rating</label>
                <select name={rating} id="rating" onChange={(e) => setRating(e.target.value)}>
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
                    id="notes"
                    rows="3"
                    cols="30"
                    onChange={(e) => setNotes(e.target.value)}
                />

                <div className="error">
                    {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}
                </div>

                <div className="btn-group">
                    <button>Add Book</button>
                    <Link to='/dashboard' className="button">Go Back</Link>
                </div>
            </div>

        </form>
    );
}

export default AddBook;
