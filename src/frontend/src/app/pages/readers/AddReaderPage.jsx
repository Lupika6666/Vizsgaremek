import { Link } from "react-router";
import { AddReaderForm } from "../../../features/readers/components/AddReaderForm";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function AddReaderPage() {
    const { readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader } = useReaders();

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/olvasok", text: "Olvasók"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Új"}/>
            <AddReaderForm readers={readers} createReader={createReader} />
            <NavigationElement/>
        </div>
    )
}