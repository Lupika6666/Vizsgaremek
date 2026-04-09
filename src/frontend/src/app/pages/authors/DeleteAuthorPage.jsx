import { Link, useParams } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteAuthorPage() {
    const { id } = useParams();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    const handleDeleteButton = () => {
        deleteAuthor(id);
    }

    if (isLoadingAuthors) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5><span className="card-title text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-outline-danger m-2" onClick={handleDeleteButton} to="/szerzok">Igen</Link>
                <Link className="btn btn-outline-secondary m-2" to="/szerzok">Vissza</Link>
            </div>

        </div>
    )
}