import { Link } from "react-router";
import { AddReaderForm } from "../../../features/readers/components/AddReaderForm";
import { useReaders } from "../../../features/readers/stores/readerProvider";

export function AddReaderPage() {
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    return (
        <div>
            <AddReaderForm createReader={createReader} />
            <Link className="btn btn-secondary" to="/olvasok">Vissza</Link>
        </div>
    )
}