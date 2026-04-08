import { Link, useSearchParams } from "react-router";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { BorrowingList } from "../../../features/borrowings/components/BorrowingList";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useUser } from "../../../features/user/stores/userProvider";
import { PaginationElement } from "../../../components/PaginationElement";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function BorrowingListPage() {
    const { user } = useUser();
    const [searchParams] = useSearchParams();

    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();
    const { readers, selectedReader, isLoading: isLoadingReaders, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();
    const { bookCopies, selectedBookCopy, isLoading: isLoadingBookCopies, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoadingBorrowings, isLoadingReaders, isLoadingBookCopies) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    if (!user.isAdmin()) {
        const borrowingsByCurrentUser = borrowings.filter(item => item.olvaso_id == user.olvaso_id);
        const maxPage = Math.ceil(borrowingsByCurrentUser.length / 10)
        const route = "kolcsonzesek";

        return (
            <div className="card shadow p-3">
                <BorrowingList borrowings={borrowingsByCurrentUser} role={user.szerepkor} page={page} />
                <PaginationElement page={page} maxPage={maxPage} route={route} />
            </div>
        )
    }

    if (searchParams.has("peldanyid")) {
        const bookCopyId = searchParams.get("peldanyid");
        const borrowingsByBookCopy = borrowings.filter(item => item.peldany_id == bookCopyId);
        const maxPage = Math.ceil(borrowingsByBookCopy.length / 10);
        const route = `kolcsonzesek?peldanyid=${bookCopyId}`;

        return (
            <div className="card shadow p-3">
                <BorrowingList borrowings={borrowingsByBookCopy} role={user.szerepkor} page={page} />
                <PaginationElement page={page} maxPage={maxPage} route={route} />
            </div>
        )
    }

    if (searchParams.has("kartyaszam")) {
        const readerIdFromParam = searchParams.get("kartyaszam");
        const borrowingsByReader = borrowings.filter(item => item.olvaso_id == readerIdFromParam);
        const maxPage = Math.ceil(borrowingsByReader.length / 10);
        const route = `kolcsonzesek?kartyaszam=${readerIdFromParam}`;

        return (
            <div>
                <div className="card shadow p-3">
                    <BorrowingList borrowings={borrowingsByReader} role={user.szerepkor} page={page} />
                    <PaginationElement page={page} maxPage={maxPage} route={route} />
                </div>
                {user.isAdmin() && (<div className="card shadow p-3">
                    <div>
                        <Link className="btn btn-outline-primary btn-sm me-2" to={`/kolcsonzesek/uj?kartyaszam=${readerIdFromParam}`} title="új kölcsönzés felvétele"><i className="bi bi-plus-lg"></i></Link>
                    </div>
                </div>)}
            </div>
        )
    }

    const maxPage = Math.ceil(borrowings.length / 10)
    const route = "kolcsonzesek";

    return (
        <div>
            <div className="card shadow p-3">
                <BorrowingList borrowings={borrowings} role={user.szerepkor} page={page} />
                <PaginationElement page={page} maxPage={maxPage} route={route} />
            </div>
            {user.isAdmin() && (<div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to="/kolcsonzesek/uj" title="új kölcsönzés felvétele"><i className="bi bi-plus-lg"></i></Link>
                </div>
            </div>)}
        </div>
    )
}