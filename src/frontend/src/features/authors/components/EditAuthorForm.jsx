import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function EditAuthorForm({author, updateAuthor}){
    const [name, setName] = useState(author.nev);

    const navigation = useNavigate();

    const handleEditAuthor = (e)=>{
        e.preventDefault();

        updateAuthor(author.id, name);

        navigation("/szerzok");
    }
    
    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="newAuthor">Új szerző név</label>
            <input type="text" className="form-control" id="newAuthor" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50}/>
            <button onClick={handleEditAuthor} className="btn btn-success">Mentés</button>
            <Link className="btn btn-secondary" to="/szerzok">Mégse</Link>
        </div>
    )
}