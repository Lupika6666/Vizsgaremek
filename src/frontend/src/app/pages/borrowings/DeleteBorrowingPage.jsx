import { Link, useParams } from "react-router"
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteBorrowingPage() {
    const { id } = useParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    const handleDeleteButton = () => {
        deleteBorrowing(id);
    }

    if (isLoadingBorrowings) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5 className="card-title"><span className="text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-danger m-2" onClick={handleDeleteButton} to="/kolcsonzesek">Igen</Link>
                <Link className="btn btn-secondary m-2" to="/kolcsonzesek">Vissza</Link>
            </div>
        </div>
    )
}