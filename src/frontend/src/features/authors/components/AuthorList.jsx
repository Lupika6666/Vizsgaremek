import { Link } from "react-router";

export function AuthorList({ authors }) {


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Szerző</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {authors.map(
                    (item) => (

                        <tr key={item.id}>
                            <td>{item.nev}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/szerzok/szerkesztes/${item.id}`}>Szerkeszt</Link>
                                <Link className="btn btn-danger" to={`/szerzok/torles/${item.id}`}>Töröl</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}