import { useState } from "react"
import { Borrowing } from "../models/Borrowing";

export function EditBorrowingForm({ borrowing, updateBorrowing }) {
    const [borrowingTime, setBorrowingTime] = useState(borrowing.kolcsonzes_ideje);
    const [deadline, setDeadline] = useState(borrowing.hatarido);
    const [bookCopyId, setBookCopyId] = useState(borrowing.peldany_id);
    const [readerId, setReaderId] = useState(borrowing.olvaso_id);

    const handleSubmit = (e) => {
        e.preventDefault();

        const borrowing = new Borrowing(borrowing.id, Date(borrowingTime), Date(deadline), Number(bookCopyId), Number(readerId));

        updateBorrowing(borrowing);

        setBorrowingTime('');
        setDeadline('');
        setBookCopyId('');
        setReaderId('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Kölcsönzés módosítása</h5>
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
                        <input type="number" className="form-control" id="newBookCopyId" value={bookCopyId} disabled />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newReaderId">Olvasó kártyaszám</label>
                        <input type="text" className="form-control" id="newReaderId" value={readerId} disabled />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i class="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>
    )
}