import { Link, useSearchParams } from "react-router";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { BorrowingList } from "../../../features/borrowings/components/BorrowingList";
import { useBooks } from "../../../features/books/stores/bookProvider";

export function BorrowingListPage() {
    const [searchParams] = useSearchParams();

    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();
    const { readers, selectedReader, isLoading: isLoadingReaders, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    if (searchParams.has("peldanyid")) {
        const bookCopyId = searchParams.get("peldanyid");
        const borrowingsByBookCopy = borrowings.filter(item => item.peldany_id == bookCopyId);
        return (
            <div>
                <BorrowingList borrowings={borrowingsByBookCopy} />
            </div>
        )
    }

    if (searchParams.has("kartyaszam")) {
        const readerId = searchParams.get("kartyaszam");
        const borrowingsByReader = borrowings.filter(item => item.olvaso_id == readerId);
        return (
            <div>
                <BorrowingList borrowings={borrowingsByReader} />
                <Link className="btn btn-primary" to={`/kolcsonzesek/uj?kartyaszam=${readerId}`}>Új kölcsönzés felvétele</Link>
            </div>
        )
    }

    return (
        <div>
            <BorrowingList borrowings={borrowings} />
            <Link className="btn btn-primary" to="/kolcsonzesek/uj">Új kölcsönzés felvétele</Link>
        </div>
    )
}