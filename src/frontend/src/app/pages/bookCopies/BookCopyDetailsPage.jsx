import { useParams } from "react-router";
import { BookCopyDetails } from "../../../features/bookCopies/components/BookCopyDetails";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useEffect } from "react";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function BookCopyDetailsPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();

    const bookCopy = bookCopies.find(item => item.id == id);

    if (isLoadingBookCopies, isLoadingBooks) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div>
            <BookCopyDetails bookCopy={bookCopy} books={books} />
        </div>
    )
}