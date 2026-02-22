import { Link } from "react-router";

export function BookCopyDetails({ bookCopy, books }) {
    return (
        <div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">ID</div>
                        {bookCopy.id}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Hely</div>
                        {bookCopy.hely}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Könyv</div>
                        {books.find(item=>item.id==bookCopy.konyv_id).cim}
                        <Link className="btn btn-primary" to={`/konyvek/${bookCopy.konyv_id}`}>Adatlap</Link>
                    </div>
                </li>
            </ol>
        </div>
    )
}