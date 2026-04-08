import { Link } from "react-router";
import { useUser } from "../../user/stores/userProvider";
import { useState } from "react";

export function BookCopyList({ bookCopies, books, borrowings, page }) {
    const { user } = useUser();

    const [elementsPerPage, setElementsPerPage] = useState(10);

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
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
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
                    {bookCopies.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
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
                                    <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/peldanyok/szerkesztes/${item.id}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>
                                    <Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/peldanyok/torles/${item.id}`} title="törlés"><i className="bi bi-trash"></i></Link>
                                </td>)}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>

    )
}
