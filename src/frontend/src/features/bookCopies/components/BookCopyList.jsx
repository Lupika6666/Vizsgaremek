import { Link } from "react-router";

export function BookCopyList({ bookCopies, books, borrowings }) {
    const borrowed = (copy_id)=>{
        const found = borrowings.find(brw=>brw.peldany_id==copy_id);
        if(found == undefined){
            return "nem";
        }
        return(
            <>
                <Link to={`/kolcsonzesek?peldanyid=${found.id}`}>igen</Link>
            </>
        )
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Hely</th>
                    <th>Könyv ID</th>
                    <th>Könyv cím</th>
                    <th>Kikölcsönözve</th>
                    <th>...</th>
                </tr>
            </thead>
            <tbody>
                {bookCopies.map(
                    (item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.hely}</td>
                            <td>{item.konyv_id}</td>
                            <td>{books.find(bk=>bk.id==item.konyv_id).cim}</td>
                            <td>
                                {
                                    borrowed(item.id)
                                }
                            </td>
                            <td>
                                <Link className="btn btn-primary" to={`/peldanyok/szerkesztes/${item.id}`}>Szerkesztes</Link>
                                <Link className="btn btn-danger" to={`/peldanyok/torles/${item.id}`}>Törlés</Link>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
