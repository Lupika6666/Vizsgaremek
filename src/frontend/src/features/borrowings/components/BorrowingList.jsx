import { Link } from "react-router";

export function BorrowingList({ borrowings, role }) {
    const isExpired = (deadline) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline)
        if (deadlineDate < currentDate) {
            return (
                <>
                    {deadline} <strong className="text-danger">Lejárt!</strong>
                </>
            )
        }
        return (
            <>
                {deadline}
            </>
        )
    }

    return (
        <table className="table table-striped">
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
                {borrowings.map(
                    (item) => (
                        <tr key={item.id}>
                            {role === "admin" && (<td>{item.id}</td>)}
                            <td>{item.kolcsonzes_ideje}</td>
                            <td>{isExpired(item.hatarido)}</td>
                            <td>
                                <Link to={`/peldanyok/${item.peldany_id}`}>{item.peldany_id}</Link>
                            </td>
                            {role === "admin" && (<td>
                                <Link to={`/olvasok/${item.olvaso_id}`}>{item.olvaso_id}</Link>
                            </td>)}
                            {role === "admin" && (<td>
                                <Link className="btn btn-primary" to={`/kolcsonzesek/szerkesztes/${item.id}`}>Szerkesztes</Link>
                                <Link className="btn btn-danger" to={`/kolcsonzesek/torles/${item.id}`}>Törlés</Link>
                            </td>)}
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
