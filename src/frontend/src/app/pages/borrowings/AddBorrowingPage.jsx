import { Link, useSearchParams } from "react-router";
import { AddBorrowingForm } from "../../../features/borrowings/components/AddBorrowingForm";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"

export function AddBorrowingPage() {
    const [searchParams] = useSearchParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    if (searchParams.has("kartyaszam")) {
        const cardNumber = searchParams.get("kartyaszam");
        return (
            <div>
                <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={cardNumber}/>
                <Link className="btn btn-secondary" to={`/kolcsonzesek?kartyaszam=${cardNumber}`}>Vissza</Link>
            </div>
        )
    }

    return (
        <div>
            <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={''}/>
            <Link className="btn btn-secondary" to="/kolcsonzesek">Vissza</Link>
        </div>
    )
}