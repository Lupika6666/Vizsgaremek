import { Link, useParams } from "react-router";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { useEffect } from "react";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { EditBorrowingForm } from "../../../features/borrowings/components/EditBorrowingForm";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function EditBorrowingPage() {
    const {id} = useParams();
    const { borrowings, selectedBorrowing, isLoading: isLoadingBorrowings, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing } = useBorrowings();

    if (isLoadingBorrowings) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    const borrowingById = borrowings.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/kolcsonzesek", text: "Kölcsönzések"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditBorrowingForm borrowing={borrowingById} updateBorrowing={updateBorrowing}/>
            <NavigationElement/>
        </div>
    )
}