import { useParams } from "react-router";
import { BookCopyDetails } from "../../../features/bookCopies/components/BookCopyDetails";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useEffect } from "react";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function BookCopyDetailsPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();

    if (isLoadingBookCopies, isLoadingBooks) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    const bookCopyById = bookCopies.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/peldanyok", text: "Példányok"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Adatlap"}/>
            <BookCopyDetails bookCopy={bookCopyById} books={books} />
            <NavigationElement/>
        </div>
    )
}