import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { EditReaderForm } from "../../../features/readers/components/EditReaderForm";

export function EditReaderPage() {
    const { id } = useParams();
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    const reader = readers.find(item => item.kartyaszam == id);

    return (
        <div>
            <EditReaderForm reader={reader} updateReader={updateReader} />
            <Link className="btn btn-secondary" to={`/olvasok/${id}`}>Vissza</Link>
        </div>
    )
}