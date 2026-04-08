import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider"
import { useEffect } from "react";
import { ReaderDetails } from "../../../features/readers/components/ReaderDetails";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function ReaderDetailsPage() {
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
            <ReaderDetails reader={reader} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/kolcsonzesek?kartyaszam=${id}`} title="kölcsönzések"><i class="bi bi-person-lines-fill"></i></Link>
                    <Link className="btn btn-outline-primary btn-sm me-3" to={`/kolcsonzesek/uj?kartyaszam=${id}`} title="új kölcsönzés"><i class="bi bi-bookmark-plus"></i></Link>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/olvasok/szerkesztes/${id}`} title="szerkesztés"><i class="bi bi-pencil-square"></i></Link>
                    <Link className="btn btn-outline-danger btn-sm me-3" to={`/olvasok/torles/${id}`} title="törlés"><i class="bi bi-trash"></i></Link>
                    <Link className="btn btn-outline-secondary btn-sm me-2" to={`/olvasok`} title="olvasó lista"><i class="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}