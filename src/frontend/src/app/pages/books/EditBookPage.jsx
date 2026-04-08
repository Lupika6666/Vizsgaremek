import { Link, useParams } from "react-router";
import { EditBookForm } from "../../../features/books/components/EditBookForm";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function EditBookPage() {
    const { id } = useParams();

    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    if (isLoadingBooks, isLoadingLanguages, isLoadingAuthors, isLoadingGenres) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div>
            <EditBookForm book={selectedBook} languages={languages} authors={authors} genres={genres} updateBook={updateBook} />
            <div  className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/konyvek/${id}`} title="könyv lista"><i class="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}