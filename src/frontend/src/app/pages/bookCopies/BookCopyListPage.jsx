import { Link, useSearchParams } from "react-router";
import { BookCopyList } from "../../../features/bookCopies/components/BookCopyList";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { PaginationElement } from "../../../components/PaginationElement";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function BookCopyListPage() {
    const [searchParams] = useSearchParams();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    if (isLoadingBookCopies, isLoadingBooks, isLoadingBorrowings) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }
    
    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (!searchParams.has("konyvid")) {
        const maxPage = Math.ceil(bookCopies.length / 10)
        const route = "peldanyok";

        return (
            <div className="card shadow p-3">
                <BookCopyList bookCopies={bookCopies} books={books} borrowings={borrowings} page={page} />
                <PaginationElement page={page} maxPage={maxPage} route={route} />
            </div>
        )
    }

    const bookId = searchParams.get("konyvid");
    const bookCopiesByBookId = bookCopies.filter(item => item.konyv_id == bookId);

    const maxPage = Math.ceil(bookCopiesByBookId.length / 10)
    const route = `peldanyok?konyvid=${bookId}`;

    return (
        <div>
            <div className="card shadow p-3">
                <BookCopyList bookCopies={bookCopiesByBookId} books={books} borrowings={borrowings} page={page} />
                <PaginationElement page={page} maxPage={maxPage} route={route} />
            </div>
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/konyvek/${bookId}`} title="könyv adatlap"><i class="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>

    )
}