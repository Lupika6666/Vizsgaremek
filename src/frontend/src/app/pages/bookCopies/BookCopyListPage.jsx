import { useSearchParams } from "react-router";
import { BookCopyList } from "../../../features/bookCopies/components/BookCopyList";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";

export function BookCopyListPage() {
    const [searchParams] = useSearchParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    if (!searchParams.has("konyvid")) {
        return (
            <div>
                <BookCopyList bookCopies={bookCopies} books={books} borrowings={borrowings}/>
            </div>
        )
    }

    const bookId = searchParams.get("konyvid");
    const bookCopiesByBookId = bookCopies.filter(item=>item.konyv_id==bookId);

    return (
        <div>
            <BookCopyList bookCopies={bookCopiesByBookId} books={books} borrowings={borrowings} />
        </div>
    )
}