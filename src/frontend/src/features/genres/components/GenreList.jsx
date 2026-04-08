import { useState } from "react";
import { Link } from "react-router";
import { PaginationElement } from "../../../components/PaginationElement";

export function GenreList({ genres, page }) {
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(Math.ceil(genres.length / 10));

    return (
        <div className="card shadow p-3">
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Műfaj</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
                            (item) => (

                                <tr key={item.id}>
                                    <td>{item.nev}</td>
                                    <td>
                                        <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/mufajok/szerkesztes/${item.id}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>
                                        <Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/mufajok/torles/${item.id}`} title="törlés"><i className="bi bi-trash"></i></Link>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <PaginationElement page={page} maxPage={maxPage} route={"mufajok"} />
        </div>

    )
}