import { Link } from "react-router";

export function BookDetails({ book }) {
    return (
        <div className="row">
            <div className="col col-12 col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h5 className="card-title">Adatok</h5>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Cím</div>
                                    {book.cim}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">ISBN</div>
                                    {book.isbn}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Év</div>
                                    {book.publikalas_ev}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Nyelv</div>
                                    {book.nyelv_id}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Szerző</div>
                                    {book.szerzo_id}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Műfaj</div>
                                    {book.mufaj_id}
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>

            <div className="col col-12 col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h5 className="card-title">Leírás</h5>
                        <p className="card-text">{book.leiras}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}