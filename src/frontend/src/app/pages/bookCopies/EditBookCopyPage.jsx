import { Link, useParams } from "react-router";
import { EditBookCopyForm } from "../../../features/bookCopies/components/EditBookCopyForm";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useEffect } from "react";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function EditBookCopyPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    if (isLoading) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    const bookCopyById = bookCopies.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: `/peldanyok?konyvid=${bookCopyById.konyv_id}`, text: "Példányok"},
        {link: `/peldanyok/${id}`, text: "Adatlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditBookCopyForm bookCopy={bookCopyById} updateBookCopy={updateBookCopy} />
            <NavigationElement/>
        </div>
    )
}