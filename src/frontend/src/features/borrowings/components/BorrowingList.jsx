import { useState } from "react";
import { Link } from "react-router";

export function BorrowingList({ borrowings, role, page }) {
    const [elementsPerPage, setElementsPerPage] = useState(10);

    const isExpired = (deadline) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline)
        if (deadlineDate < currentDate) {
            return (
                <>
                    {deadline.split('T')[0]} <strong className="text-danger">Lejárt!</strong>
                </>
            )
        }
        return (
            <>
                {deadline.split('T')[0]}
            </>
        )
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        {role === "admin" && (<th>ID</th>)}
                        <th>Kölcsönzés ideje</th>
                        <th>Határidő</th>
                        <th>Példány</th>
                        {role === "admin" && (<th>Olvasó</th>)}
                        {role === "admin" && (<th>...</th>)}
                    </tr>
                </thead>
                <tbody>
                    {borrowings.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
                        (item) => (
                            <tr key={item.id}>
                                {role === "admin" && (<td>{item.id}</td>)}
                                <td>{item.kolcsonzes_ideje.split('T')[0]}</td>
                                <td>{isExpired(item.hatarido)}</td>
                                <td>
                                    <Link to={`/peldanyok/${item.peldany_id}`}>{item.peldany_id}</Link>
                                </td>
                                {role === "admin" && (<td>
                                    <Link to={`/olvasok/${item.olvaso_id}`}>{item.olvaso_id}</Link>
                                </td>)}
                                {role === "admin" && (<td>
                                    <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/kolcsonzesek/szerkesztes/${item.id}`} title="szerkesztés"><i class="bi bi-pencil-square"></i></Link>
                                    <Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/kolcsonzesek/torles/${item.id}`} title="törlés"><i class="bi bi-trash"></i></Link>
                                </td>)}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>

    )
}
