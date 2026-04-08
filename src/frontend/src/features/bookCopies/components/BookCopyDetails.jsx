import { Link } from "react-router";
import { useUser } from "../../user/stores/userProvider";

export function BookCopyDetails({ bookCopy, books }) {
    const { user } = useUser();

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Példány adatlap</h5>
                <ul className="list-group">
                    {user.isAdmin() && (<li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">ID</div>
                            {bookCopy.id}
                        </div>
                    </li>)}
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Hely</div>
                            {bookCopy.hely}
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Könyv</div>
                            {books.find(item => item.id == bookCopy.konyv_id).cim}
                            <Link className="btn btn-outline-primary btn-sm ms-2" to={`/konyvek/${bookCopy.konyv_id}`} title="könyv adatlap"><i class="bi bi-book"></i></Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}