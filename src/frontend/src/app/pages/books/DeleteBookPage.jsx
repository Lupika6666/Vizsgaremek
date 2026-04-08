import { Link, useParams } from "react-router";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";


export function DeleteBookPage() {
    const { id } = useParams();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();

    const handleDeleteButton = () => {
        deleteBook(id);
    }

    if (isLoadingBooks) {
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
                <Link className="btn btn-danger m-2" onClick={handleDeleteButton} to="/konyvek">Igen</Link>
                <Link className="btn btn-secondary m-2" to={`/konyvek/${id}`}>Vissza</Link>
            </div>
        </div>
    )
}