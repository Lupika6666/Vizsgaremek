import { Link, useSearchParams } from "react-router";
import { AddBorrowingForm } from "../../../features/borrowings/components/AddBorrowingForm";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { LoadingScreen } from "../../../components/LoadingScreen";

export function AddBorrowingPage() {
    const [searchParams] = useSearchParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    if (isLoadingBorrowings) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }
    
    if (searchParams.has("kartyaszam")) {
        const cardNumber = searchParams.get("kartyaszam");
        return (
            <div>
                <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={cardNumber} />
                <div className="card shadow p-3">
                    <div>
                        <Link className="btn btn-outline-secondary btn-sm me-2" to={`/kolcsonzesek?kartyaszam=${cardNumber}`} title="kölcsönzés lista"><i className="bi bi-arrow-left"></i></Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={''} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to="/kolcsonzesek" title="kölcsönzés lista"><i className="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}