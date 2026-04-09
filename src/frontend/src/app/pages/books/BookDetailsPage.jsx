import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { BookDetails } from "../../../features/books/components/BookDetails";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { AddBookCopyForm } from "../../../features/bookCopies/components/AddBookCopyForm";
import { useUser } from "../../../features/user/stores/userProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function BookDetailsPage() {
    const { user } = useUser();
    const { id } = useParams();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    if (isLoadingBooks, isLoadingBookCopies) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    const bookById = books.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/konyvek", text: "Könyvek"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Adatlap"}/>
            <BookDetails book={bookById} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/peldanyok?konyvid=${id}`} title="példányok"><i className="bi bi-bookshelf"></i></Link>
                    {user.isAdmin() && (<Link className="btn btn-outline-primary btn-sm me-2" to={`/konyvek/szerkesztes/${id}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>)}
                    {user.isAdmin() && (<Link className="btn btn-outline-danger btn-sm me-3" to={`/konyvek/torles/${id}`} title="törlés"><i className="bi bi-trash"></i></Link>)}
                </div>
            </div>
            {user.isAdmin() && (<AddBookCopyForm selectedBookId={id} createBookCopy={createBookCopy} />)}
            <NavigationElement/>
        </div>
    )
}