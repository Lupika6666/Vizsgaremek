import { BookList } from "../../../features/books/components/BookList";
import { Link } from "react-router";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";

export function BookListPage() {

    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    return (
        <div>
            <BookList books={books} />
            <Link className="btn btn-primary" to="/konyvek/uj">Új könyv felvétele</Link>
        </div>
    )
}