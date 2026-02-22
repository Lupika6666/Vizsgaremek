import { useState } from "react"
import { Reader } from "../models/Reader";

export function AddReaderForm({ createReader }) {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const reader = new Reader(cardNumber, name, email, phone);

        createReader(reader);

        setCardNumber('');
        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newCardNumber">Kártyaszám</label>
                <input type="number" className="form-control" id="newCardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required min={1}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newName">Név</label>
                <input type="text" className="form-control" id="newName" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newEmail">Email</label>
                <input type="email" className="form-control" id="newEmail" value={email} onChange={(e) => setEmail(e.target.value)} required minLength={2} maxLength={50}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newPhone">Telefonszám</label>
                <input type="text" className="form-control" id="newPhone" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={12}/>
            </div>

            <button type="submit" className="btn btn-primary w-100">Mentés</button>
        </form>
    )
}