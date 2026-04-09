import { Link } from "react-router";
import { useReaders } from "../../../features/readers/stores/readerProvider";
import { AccountDetails } from "../../../features/user/components/AccountDetails";
import { useUser } from "../../../features/user/stores/userProvider"
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function AccountDetailsPage() {
    const { user } = useUser();
    const { readers } = useReaders();

    const currentReader = readers.find(item => item.kartyaszam === user.olvaso_id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Fiók"}/>
            <AccountDetails currentUser={user} currentReader={currentReader} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-primary btn-sm me-2" to={`/kolcsonzesek?kartyaszam=${user.olvaso_id}`} title="kölcsönzések"><i className="bi bi-person-lines-fill"></i></Link>
                </div>
            </div>
            <NavigationElement/>
        </div>
    )
}