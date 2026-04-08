import { useState } from "react";

export function AddGenreForm({ createGenre }) {
    const [name, setName] = useState('');

    const handleAddGenre = () => {
        createGenre(name);
        setName('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Új műfaj hozzáadása</h5>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="newGenre">Műfaj</label>
                    <input type="text" className="form-control" id="newGenre" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25} />
                    <button onClick={handleAddGenre} className="btn btn-outline-success btn-sm" title="hozzáadás"><i className="bi bi-check-lg"></i></button>
                </div>
            </div>
        </div>

    )
}
