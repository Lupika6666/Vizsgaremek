import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditGenreForm({ genre, updateGenre }) {
    const [name, setName] = useState(genre.nev);

    const navigation = useNavigate();

    const handleEditGenre = (e) => {
        e.preventDefault();

        updateGenre(genre.id, name);

        navigation("/mufajok");
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Műfaj módosítása</h5>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="newGenre">Műfaj</label>
                    <input type="text" className="form-control" id="newGenre" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25} />
                    <button onClick={handleEditGenre} className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </div>
            </div>
        </div>
    )
}