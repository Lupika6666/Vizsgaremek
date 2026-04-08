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
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/peldanyok?konyvid=${selectedBookCopy.konyv_id}`} title="példány lista"><i class="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}