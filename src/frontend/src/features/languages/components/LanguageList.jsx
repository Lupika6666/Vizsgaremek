import { Link } from "react-router";

export function LanguageList({ languages }) {


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nyelv</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {languages.map(
                    (item) => (

                        <tr key={item.id}>
                            <td>{item.nev}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/nyelvek/szerkesztes/${item.id}`}>Szerkeszt</Link>
                                <Link className="btn btn-danger" to={`/nyelvek/torles/${item.id}`}>Töröl</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}