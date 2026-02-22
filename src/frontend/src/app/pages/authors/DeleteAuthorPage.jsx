import { Link, useParams } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";

export function DeleteAuthorPage() {
    const { id } = useParams();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    const handleDeleteButton = () => {
        deleteAuthor(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/szerzok">Igen</Link>
            <Link className="btn btn-secondary" to="/szerzok">Vissza</Link>
        </div>
    )
}