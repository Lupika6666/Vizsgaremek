import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider"
import { useEffect } from "react";
import { ReaderDetails } from "../../../features/readers/components/ReaderDetails";

export function ReaderDetailsPage() {
    const { id } = useParams();
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    // useEffect(
    //     ()=>{
    //         getReaderById(id)
    //     }, []
    // );

    const reader = readers.find(item => item.kartyaszam == id);

    return (
        <div>
            <ReaderDetails reader={reader} />
            <Link className="btn btn-primary m-2" to={`/olvasok/szerkesztes/${id}`}>Szerkesztés</Link>
            <Link className="btn btn-danger m-2" to={`/olvasok/torles/${id}`}>Törlés</Link>
            <Link className="btn btn-secondary m-2" to="/olvasok">Vissza</Link>
            <Link className="btn btn-secondary m-2" to={`/kolcsonzesek?kartyaszam=${id}`}>Kölcsönzések</Link>
        </div>
    )
}