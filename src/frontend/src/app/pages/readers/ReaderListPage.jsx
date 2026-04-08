import { Link, useSearchParams } from "react-router";
import { ReaderList } from "../../../features/readers/components/ReaderList";
import { useReaders } from "../../../features/readers/stores/readerProvider"
import { LoadingScreen } from "../../../components/LoadingScreen";

export function ReaderListPage() {
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();
    const [searchParams] = useSearchParams();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div>
            <ReaderList readers={readers} page={page} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to="/olvasok/uj" title="új olvasó felvétele"><i className="bi bi-plus-lg"></i></Link>
                </div>
            </div>
        </div>
    )
}