import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { EditReaderForm } from "../../../features/readers/components/EditReaderForm";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function EditReaderPage() {
    const { id } = useParams();
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    const reader = readers.find(item => item.kartyaszam == id);

    return (
        <div>
            <EditReaderForm reader={reader} updateReader={updateReader} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/olvasok/${id}`} title="olvasó adatlap"><i className="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}