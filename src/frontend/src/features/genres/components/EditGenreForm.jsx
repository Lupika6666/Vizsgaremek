import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditGenreForm({genre, updateGenre}){
    const [name, setName] = useState(genre.nev);

    const navigation = useNavigate();

    const handleEditGenre = (e)=>{
        e.preventDefault();

        updateGenre(genre.id, name);

        navigation("/mufajok");
    }
    
    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newGenre">Új műfaj név</label>
            <input type="text" className="form-control" id="newGenre" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={25}/>
            <button onClick={handleEditGenre} className="btn btn-success">Mentés</button>
            <Link className="btn btn-secondary" to="/mufajok">Mégse</Link>
        </div>
    )
}