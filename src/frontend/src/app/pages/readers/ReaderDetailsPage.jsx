import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider"
import { useEffect } from "react";
import { ReaderDetails } from "../../../features/readers/components/ReaderDetails";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

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

    const readerById = readers.find(item => item.kartyaszam == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/olvasok", text: "Olvasók"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Adatlap"}/>
            <ReaderDetails reader={readerById} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/kolcsonzesek?kartyaszam=${id}`} title="kölcsönzések"><i className="bi bi-person-lines-fill"></i></Link>
                    <Link className="btn btn-outline-primary btn-sm me-3" to={`/kolcsonzesek/uj?kartyaszam=${id}`} title="új kölcsönzés"><i className="bi bi-bookmark-plus"></i></Link>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/olvasok/szerkesztes/${id}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>
                    <Link className="btn btn-outline-danger btn-sm me-3" to={`/olvasok/torles/${id}`} title="törlés"><i className="bi bi-trash"></i></Link>
                </div>
            </div>
            <NavigationElement/>
        </div>
    )
}