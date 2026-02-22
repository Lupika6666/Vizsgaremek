import { useState } from "react";

export function AddLanguageForm({ createLanguage }) {
    const [name, setName] = useState('');

    const handleAddLanguage = ()=>{
        createLanguage(name);
        setName('');
    }

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newLanguage">Új nyelv</label>
            <input type="text" className="form-control" id="newLanguage" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25}/>
            <button onClick={handleAddLanguage} className="btn btn-success">Hozzáad</button>
        </div>
    )
}