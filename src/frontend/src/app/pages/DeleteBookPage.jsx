import { Link, useParams } from "react-router";
import { bookApi } from "../../features/books/api/bookApi";

export function DeleteBookPage(){
    const {id} = useParams();

    const deleteBook = async()=>{
        await bookApi.delete(id);
    }

    return(
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={deleteBook} to="/konyvek">Igen</Link>
            <Link className="btn btn-secondary" to={`/konyvek/${id}`}>Vissza</Link>
        </div>
    )
}