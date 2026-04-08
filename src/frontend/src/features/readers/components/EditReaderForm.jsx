import { useState } from "react"
import { Reader } from "../models/Reader";
import { useNavigate } from "react-router";

export function EditReaderForm({ reader, updateReader }) {

    const [name, setName] = useState(reader.nev);
    const [email, setEmail] = useState(reader.email);
    const [phone, setPhone] = useState(reader.tel);

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedReader = new Reader(reader.kartyaszam, name, email, phone);

        updateReader(editedReader);

        navigation(`/olvasok/${reader.kartyaszam}`);
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Olvasó adatainak szerkesztése</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newName">Új Név</label>
                        <input type="text" className="form-control" id="newName" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newEmail">Új Email</label>
                        <input type="email" className="form-control" id="newEmail" value={email} onChange={(e) => setEmail(e.target.value)} required minLength={2} maxLength={50} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newPhone">Új Telefonszám</label>
                        <input type="text" className="form-control" id="newPhone" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={12} />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>
    )
}