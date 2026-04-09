import { Link, useParams } from "react-router";
import { EditBookForm } from "../../../features/books/components/EditBookForm";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

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

    const bookById = books.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/konyvek", text: "Könyvek"},
        {link: `/konyvek/${id}`, text: "Adatlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditBookForm book={bookById} languages={languages} authors={authors} genres={genres} updateBook={updateBook} />
            <NavigationElement/>
        </div>
    )
}