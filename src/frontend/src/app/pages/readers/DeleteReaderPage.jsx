import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";

export function DeleteReaderPage() {
    const { id } = useParams();
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    const handleDeleteButton = () => {
        deleteReader(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/olvasok">Igen</Link>
            <Link className="btn btn-secondary" to={`/olvasok/${id}`}>Vissza</Link>
        </div>
    )
}