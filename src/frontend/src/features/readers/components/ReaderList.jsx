import { Link } from "react-router";

export function ReaderList({ readers }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Kártyaszám</th>
                    <th>Név</th>
                    <th>Email</th>
                    <th>Telefonszám</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {readers.map(
                    (item) => (
                        <tr key={item.kartyaszam}>
                            <td>{item.kartyaszam}</td>
                            <td>{item.nev}</td>
                            <td>{item.email}</td>
                            <td>{item.tel}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/olvasok/${item.kartyaszam}`}>Adatlap</Link>
                                <Link className="btn btn-danger" to={`/olvasok/torles/${item.kartyaszam}`}>Törlés</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
