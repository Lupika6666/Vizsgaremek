import { Link } from "react-router";

export function GenreList({ genres }) {


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Műfaj</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {genres.map(
                    (item) => (

                        <tr key={item.id}>
                            <td>{item.nev}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/mufajok/szerkesztes/${item.id}`}>Szerkeszt</Link>
                                <Link className="btn btn-danger" to={`/mufajok/torles/${item.id}`}>Töröl</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}