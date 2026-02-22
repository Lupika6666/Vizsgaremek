import { Link, useParams } from "react-router";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { useEffect } from "react";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { EditBorrowingForm } from "../../../features/borrowings/components/EditBorrowingForm";

export function EditBorrowingPage() {
    const {id} = useParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    useEffect(
        ()=>{
            getBorrowingById(id);
        }, []
    )

    if (isLoadingBorrowings) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div>
            <EditBorrowingForm borrowing={selectedBorrowing} updateBorrowing={updateBorrowing}/>
            <Link className="btn btn-secondary" to="/kolcsonzesek">Vissza</Link>
        </div>
    )
}