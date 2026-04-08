import { useState } from "react"
import { BookCopy } from "../models/BookCopy";
import { useNavigate } from "react-router";

export function EditBookCopyForm({ bookCopy, updateBookCopy }) {

    const [place, setPlace] = useState(bookCopy.hely);
    const [bookId, setBookId] = useState(bookCopy.konyv_id);

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedBookCopy = new BookCopy(bookCopy.id, place, Number(bookId));

        updateBookCopy(editedBookCopy);

        navigation(`/peldanyok/${bookCopy.id}`);

        // setPlace('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card.title">Példány szerkesztése</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newPlace">Hely</label>
                        <input type="text" className="form-control" id="newPlace" value={place} onChange={(e) => setPlace(e.target.value)} required maxLength={25} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="konyvId">Könyv ID</label>
                        <input type="text" className="form-control" id="konyvId" value={bookId} onChange={(e) => setBookId(e.target.value)} disabled />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i class="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>

    )
}