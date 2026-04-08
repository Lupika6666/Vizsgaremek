import { useState } from "react"
import { BookCopy } from "../models/BookCopy";

export function AddBookCopyForm({ selectedBookId, createBookCopy }) {
    const [place, setPlace] = useState('');
    const [bookId, setBookId] = useState(selectedBookId);

    const handleSubmit = (e) => {
        e.preventDefault();

        const copy = new BookCopy(0, place, Number(bookId));

        createBookCopy(copy);

        setPlace('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Új Példány Hozzáadása</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newPlace">Hely</label>
                        <input type="text" className="form-control" id="newPlace" value={place} onChange={(e) => setPlace(e.target.value)} required maxLength={25} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="konyvId">Könyv ID</label>
                        <input type="text" className="form-control" id="konyvId" value={bookId} disabled />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>
    )
}