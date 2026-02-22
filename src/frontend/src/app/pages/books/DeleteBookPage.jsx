import { Link, useParams } from "react-router";
import { useBooks } from "../../../features/books/stores/bookProvider";


export function DeleteBookPage() {
    const { id } = useParams();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();

    const handleDeleteButton = () => {
        deleteBook(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/konyvek">Igen</Link>
            <Link className="btn btn-secondary" to={`/konyvek/${id}`}>Vissza</Link>
        </div>
    )
}