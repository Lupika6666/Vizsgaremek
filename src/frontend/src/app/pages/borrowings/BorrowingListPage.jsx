import { Link, useSearchParams } from "react-router";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { BorrowingList } from "../../../features/borrowings/components/BorrowingList";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useUser } from "../../../features/user/stores/userProvider";

export function BorrowingListPage() {
    const { user } = useUser();
    const [searchParams] = useSearchParams();

    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();
    const { readers, selectedReader, isLoading: isLoadingReaders, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    if(!user.isAdmin()){
        const borrowingsByCurrentUser = borrowings.filter(item => item.olvaso_id == user.olvaso_id);
        return(
            <div>
                <BorrowingList borrowings={borrowingsByCurrentUser} role={user.szerepkor} />
            </div>
        )
    }
    
    if (searchParams.has("peldanyid")) {
        const bookCopyId = searchParams.get("peldanyid");
        const borrowingsByBookCopy = borrowings.filter(item => item.peldany_id == bookCopyId);
        return (
            <div>
                <BorrowingList borrowings={borrowingsByBookCopy} role={user.szerepkor} />
            </div>
        )
    }

    if (searchParams.has("kartyaszam")) {
        const readerIdFromParam = searchParams.get("kartyaszam");
        const borrowingsByReader = borrowings.filter(item => item.olvaso_id == readerIdFromParam);
        return (
            <div>
                <BorrowingList borrowings={borrowingsByReader} role={user.szerepkor} />
                {user.isAdmin() && (<Link className="btn btn-primary" to={`/kolcsonzesek/uj?kartyaszam=${readerIdFromParam}`}>Új kölcsönzés felvétele</Link>)}
            </div>
        )
    }

    return (
        <div>
            <BorrowingList borrowings={borrowings} role={user.szerepkor} />
            {user.isAdmin() && (<Link className="btn btn-primary" to="/kolcsonzesek/uj">Új kölcsönzés felvétele</Link>)}
        </div>
    )
}