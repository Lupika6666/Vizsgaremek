import { useParams } from "react-router";
import { BookCopyDetails } from "../../../features/bookCopies/components/BookCopyDetails";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useEffect } from "react";
import { useBooks } from "../../../features/books/stores/bookProvider";

export function BookCopyDetailsPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();

    useEffect(
        () => {
            getBookCopyById(id);
        }, []
    );

    return (
        <div>
            <BookCopyDetails bookCopy={selectedBookCopy} books={books} />
        </div>
    )
}