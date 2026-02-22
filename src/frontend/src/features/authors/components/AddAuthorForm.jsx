import { useState } from "react";

export function AddAuthorForm({ createAuthor }) {
    const [name, setName] = useState('');

    const handleAddAuthor = ()=>{
        createAuthor(name);
        setName('');
    }

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newAuthor">Új szerző</label>
            <input type="text" className="form-control" id="newAuthor" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50}/>
            <button onClick={handleAddAuthor} className="btn btn-success">Hozzáad</button>
        </div>
    )
}