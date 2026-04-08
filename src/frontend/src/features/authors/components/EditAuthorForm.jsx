import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditAuthorForm({ author, updateAuthor }) {
    const [name, setName] = useState(author.nev);

    const navigation = useNavigate();

    const handleEditAuthor = (e) => {
        e.preventDefault();

        updateAuthor(author.id, name);

        navigation("/szerzok");
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Szerző módosítása</h5>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="newAuthor">Név</label>
                    <input type="text" className="form-control" id="newAuthor" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50} />
                    <button onClick={handleEditAuthor} className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </div>
            </div>

        </div>

    )
}