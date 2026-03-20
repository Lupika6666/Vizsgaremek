import { Link } from "react-router";
import { useUser } from "../../user/stores/userProvider";

export function BookCopyList({ bookCopies, books, borrowings }) {
    const { user } = useUser();

    const isBorrowed = (copy_id) => {
        const found = borrowings.find(brw => brw.peldany_id == copy_id);
        if (found == undefined) {
            return "nem";
        }
        if (!user.isAdmin()) {
            return "igen";
        }
        return (
            <>
                <Link to={`/kolcsonzesek?peldanyid=${found.id}`}>igen</Link>
            </>
        )
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {user.isAdmin() && (<th>ID</th>)}
                    <th>Hely</th>
                    <th>Könyv ID</th>
                    <th>Könyv cím</th>
                    <th>Kikölcsönözve</th>
                    {user.isAdmin() && (<th>...</th>)}
                </tr>
            </thead>
            <tbody>
                {bookCopies.map(
                    (item) => (
                        <tr key={item.id}>
                            {user.isAdmin() && (<td>{item.id}</td>)}
                            <td>{item.hely}</td>
                            <td>{item.konyv_id}</td>
                            <td>{books.find(bk => bk.id == item.konyv_id).cim}</td>
                            <td>
                                {
                                    isBorrowed(item.id)
                                }
                            </td>
                            {user.isAdmin() && (<td>
                                <Link className="btn btn-primary" to={`/peldanyok/szerkesztes/${item.id}`}>Szerkesztes</Link>
                                <Link className="btn btn-danger" to={`/peldanyok/torles/${item.id}`}>Törlés</Link>
                            </td>)}
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
