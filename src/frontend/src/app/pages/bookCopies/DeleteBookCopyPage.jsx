import { Link, useParams } from "react-router";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteBookCopyPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    const handleDeleteButton = () => {
        deleteBookCopy(id);
    }

    if (isLoading) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5 className="card-title"><span className="text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-danger m-2" onClick={handleDeleteButton} to="/peldanyok">Igen</Link>
                <Link className="btn btn-secondary m-2" to="/peldanyok">Vissza</Link>
            </div>
        </div>
    )
}