import { useState } from "react";

export function AddGenreForm({ createGenre }) {
    const [name, setName] = useState('');

    const handleAddGenre = ()=>{
        createGenre(name);
        setName('');
    }

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newGenre">Új műfaj</label>
            <input type="text" className="form-control" id="newGenre" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25}/>
            <button onClick={handleAddGenre} className="btn btn-success">Hozzáad</button>
        </div>
    )
}