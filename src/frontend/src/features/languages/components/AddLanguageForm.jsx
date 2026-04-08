import { useState } from "react";

export function AddLanguageForm({ createLanguage }) {
    const [name, setName] = useState('');

    const handleAddLanguage = () => {
        createLanguage(name);
        setName('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Új nyelv hozzáadása</h5>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="newLanguage">Nyelv</label>
                    <input type="text" className="form-control" id="newLanguage" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25} />
                    <button onClick={handleAddLanguage} className="btn btn-outline-success btn-sm" title="hozzáadás"><i class="bi bi-check-lg"></i></button>
                </div>
            </div>
        </div>
    )
}