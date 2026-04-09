import { Link, useParams } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { EditReaderForm } from "../../../features/readers/components/EditReaderForm";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { NavigationElement } from "../../../components/NavigationElement";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";

export function EditReaderPage() {
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
        {link: "/olvasok", text: "Olvasók"},
        {link: `/olvasok/${id}`, text: "Adatlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditReaderForm reader={readerById} updateReader={updateReader} />
            <NavigationElement/>
        </div>
    )
}