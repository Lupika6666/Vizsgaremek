import { Link } from "react-router";
import { AddReaderForm } from "../../../features/readers/components/AddReaderForm";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function AddReaderPage() {
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div>
            <AddReaderForm readers={readers} createReader={createReader} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/olvasok`} title="olvasó lista"><i class="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}