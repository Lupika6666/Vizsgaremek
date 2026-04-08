import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteReaderPage() {
    const { id } = useParams();
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    const handleDeleteButton = () => {
        deleteReader(id);
    }

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5 className="card-title"><span className="text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-danger m-2" onClick={handleDeleteButton} to="/olvasok">Igen</Link>
                <Link className="btn btn-secondary m-2" to={`/olvasok/${id}`}>Vissza</Link>
            </div>
        </div>
    )
}