import { useState } from "react";

export function AddAuthorForm({ createAuthor }) {
    const [name, setName] = useState('');

    const handleAddAuthor = () => {
        createAuthor(name);
        setName('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Új szerző hozzáadása</h5>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="newAuthor">Név</label>
                    <input type="text" className="form-control" id="newAuthor" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50} />
                    <button onClick={handleAddAuthor} className="btn btn-outline-success btn-sm" title="hozzáadás"><i class="bi bi-check-lg"></i></button>
                </div>
            </div>
        </div>

    )
}