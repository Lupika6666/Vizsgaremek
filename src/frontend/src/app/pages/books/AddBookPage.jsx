import { AddBookForm } from "../../../features/books/components/AddBookForm";
import { Link } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function AddBookPage() {

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

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/konyvek", text: "Könyvek"}
    ];
    
    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Új"}/>
            <AddBookForm languages={languages} authors={authors} genres={genres} createBook={createBook} />
            <NavigationElement/>
        </div>
    )
}