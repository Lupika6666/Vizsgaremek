import { Link, useParams } from "react-router";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";

export function DeleteBookCopyPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    const handleDeleteButton = () => {
        deleteBookCopy(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/peldanyok">Igen</Link>
            <Link className="btn btn-secondary" to="/peldanyok">Vissza</Link>
        </div>
    )
}