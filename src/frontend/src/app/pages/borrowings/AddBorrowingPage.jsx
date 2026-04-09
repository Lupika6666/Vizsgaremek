import { Link, useSearchParams } from "react-router";
import { AddBorrowingForm } from "../../../features/borrowings/components/AddBorrowingForm";
import { useBorrowings } from "../../../features/borrowings/stores/borrowingProvider"
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

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

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/kolcsonzesek", text: "Kölcsönzések"}
    ];
    
    if (searchParams.has("kartyaszam")) {
        const cardNumber = searchParams.get("kartyaszam");
        return (
            <div>
                <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Új"}/>
                <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={cardNumber} />
                <NavigationElement/>
            </div>
        )
    }

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Új"}/>
            <AddBorrowingForm createBorrowing={createBorrowing} cardNumber={''} />
            <NavigationElement/>
        </div>
    )
}