import { Link } from "react-router";

export function BookList({books}) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cím</th>
                    <th>ISBN</th>
                    <th>Év</th>
                    <th>Leírás</th>
                    <th>Nyelv</th>
                    <th>Szerző</th>
                    <th>Műfaj</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {books.map(
                    (item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.cim}</td>
                            <td>{item.isbn}</td>
                            <td>{item.publikalas_ev}</td>
                            <td>{item.leiras}</td>
                            <td>{item.nyelv_id}</td>
                            <td>{item.szerzo_id}</td>
                            <td>{item.mufaj_id}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/konyvek/${item.id}`}>Adatlap</Link>
                                <Link className="btn btn-danger" to={`/konyvek/torles/${item.id}`}>Törlés</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

//{{pathname: `${item.id}`}}