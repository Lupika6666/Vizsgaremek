import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditLanguageForm({language, updateLanguage}){
    const [name, setName] = useState(language.nev);

    const navigation = useNavigate();

    const handleEditLanguage = (e)=>{
        e.preventDefault();

        updateLanguage(language.id, name);

        navigation("/nyelvek");
    }
    
    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newLanguage">Új nyelv</label>
            <input type="text" className="form-control" id="newLanguage" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25}/>
            <button onClick={handleEditLanguage} className="btn btn-success">Mentés</button>
            <Link className="btn btn-secondary" to="/nyelvek">Mégse</Link>
        </div>
    )
}