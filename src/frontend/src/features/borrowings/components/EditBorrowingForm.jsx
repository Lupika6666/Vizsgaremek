import { useState } from "react"
import { Borrowing } from "../models/Borrowing";

export function EditBorrowingForm({ borrowing, updateBorrowing }) {
    const [borrowingTime, setBorrowingTime] = useState(borrowing.kolcsonzes_ideje.split('T')[0]);
    const [deadline, setDeadline] = useState(borrowing.hatarido.split('T')[0]);
    const [bookCopyId, setBookCopyId] = useState(borrowing.peldany_id);
    const [readerId, setReaderId] = useState(borrowing.olvaso_id);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedBorrowing = new Borrowing(borrowing.id, borrowingTime, deadline, Number(bookCopyId), Number(readerId));

        updateBorrowing(editedBorrowing);

    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Kölcsönzés módosítása</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newBorrowingTime">Kölcsönzés ideje</label>
                        <input type="date" className="form-control" id="newBorrowingTime" value={borrowingTime} disabled />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newDeadline">Határidő</label>
                        <input type="date" className="form-control" id="newDeadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newBookCopyId">Példány ID</label>
                        <input type="number" className="form-control" id="newBookCopyId" value={bookCopyId} disabled />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newReaderId">Olvasó kártyaszám</label>
                        <input type="text" className="form-control" id="newReaderId" value={readerId} disabled />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>
    )
}