import { useState } from "react";
import { Link } from "react-router";
import { PaginationElement } from "../../../components/PaginationElement";

export function AuthorList({ authors, page }) {
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(Math.ceil(authors.length / 10));

    return (
        <div className="card shadow p-3">
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Szerző</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
                            (item) => (

                                <tr key={item.id}>
                                    <td>{item.nev}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/szerzok/szerkesztes/${item.id}`} title="szerkesztés"><i class="bi bi-pencil-square"></i></Link>
                                        <Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/szerzok/torles/${item.id}`} title="törlés"><i class="bi bi-trash"></i></Link>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationElement page={page} maxPage={maxPage} route={"szerzok"} />
        </div>

    )
}