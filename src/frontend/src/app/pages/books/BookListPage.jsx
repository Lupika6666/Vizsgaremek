import { BookList } from "../../../features/books/components/BookList";
import { Link, useSearchParams } from "react-router";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useUser } from "../../../features/user/stores/userProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function BookListPage() {
    const { user } = useUser();

    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    const [searchParams] = useSearchParams();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoadingBooks, isLoadingLanguages, isLoadingAuthors, isLoadingGenres) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Könyvek"}/>
            <BookList books={books} page={page} />
            {user.isAdmin() && (<div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to="/konyvek/uj" title="új könyv felvétele"><i className="bi bi-plus-lg"></i></Link>
                </div>
            </div>)}
            <NavigationElement/>
        </div>
    )
}