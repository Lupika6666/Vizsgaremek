import { Link } from "react-router";
import { ReaderList } from "../../../features/readers/components/ReaderList";
import { useReaders } from "../../../features/readers/stores/readerProvider"

export function ReaderListPage() {
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    return (
        <div>
            <ReaderList readers={readers} />
            <Link className="btn btn-primary" to="/olvasok/uj">Új olvasó felvétele</Link>
        </div>
    )
}