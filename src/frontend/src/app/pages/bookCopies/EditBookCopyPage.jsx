import { Link, useParams } from "react-router";
import { EditBookCopyForm } from "../../../features/bookCopies/components/EditBookCopyForm";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { useEffect } from "react";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function EditBookCopyPage() {
    const { id } = useParams();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    useEffect(
        () => {
            getBookCopyById(id);
        }, []
    );

    if (isLoading) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }

    return (
        <div>
            <EditBookCopyForm bookCopy={selectedBookCopy} updateBookCopy={updateBookCopy} />
            <Link className="btn btn-secondary" to="/peldanyok">Vissza</Link>
        </div>
    )
}