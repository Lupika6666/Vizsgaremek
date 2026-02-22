import { Link, useParams } from "react-router";
import { EditBookForm } from "../../../features/books/components/EditBookForm";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";

export function EditBookPage() {
    const {id} = useParams();
    
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    return (
        <div className="row">
            
            <div className="col col-6">
                <EditBookForm book={selectedBook} languages={languages} authors={authors} genres={genres} updateBook={updateBook}/>
                <Link className="btn btn-secondary" to={`/konyvek/${id}`}>Vissza</Link>
            </div>
            
        </div>
    )
}