import { useState } from "react"
import { Borrowing } from "../models/Borrowing";

export function AddBorrowingForm({ createBorrowing, cardNumber }) {
    const [borrowingTime, setBorrowingTime] = useState('');
    const [deadline, setDeadline] = useState('');
    const [bookCopyId, setBookCopyId] = useState('');
    const [readerId, setReaderId] = useState(cardNumber);

    const handleSubmit = (e) => {
        e.preventDefault();

        const borrowing = new Borrowing(0, borrowingTime, deadline, Number(bookCopyId), Number(readerId));

        createBorrowing(borrowing);

        setBorrowingTime('');
        setDeadline('');
        setBookCopyId('');
        setReaderId('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Új kölcsönzés felvétele</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newBorrowingTime">Kölcsönzés ideje</label>
                        <input type="date" className="form-control" id="newBorrowingTime" value={borrowingTime} onChange={(e) => setBorrowingTime(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newDeadline">Határidő</label>
                        <input type="date" className="form-control" id="newDeadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newBookCopyId">Példány ID</label>
                        <input type="number" className="form-control" id="newBookCopyId" value={bookCopyId} onChange={(e) => setBookCopyId(e.target.value)} required min={1} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newReaderId">Olvasó kártyaszám</label>
                        <input type="number" className="form-control" id="newReaderId" value={readerId} onChange={(e) => setReaderId(e.target.value)} required min={1} />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>

    )
}