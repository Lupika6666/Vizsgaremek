export function ReaderDetails({ reader }) {
    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Olvasó adatai</h5>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Kártyaszám</div>
                            {reader.kartyaszam}
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Név</div>
                            {reader.nev}
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Email</div>
                            {reader.email}
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Telefonszám</div>
                            {reader.tel}
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}