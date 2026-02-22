import { Link, useParams } from "react-router"
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider";

export function DeleteBorrowingPage() {
    const {id} = useParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    const handleDeleteButton = () => {
        deleteBorrowing(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/kolcsonzesek">Igen</Link>
            <Link className="btn btn-secondary" to="/kolcsonzesek">Vissza</Link>
        </div>
    )
}