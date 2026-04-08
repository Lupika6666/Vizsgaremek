export function AccountDetails({ currentUser, currentReader }) {
    return (
        <div>
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">Fiók adatok</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Felhasználónév</div>
                                {currentUser.nev}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Regisztrációs email</div>
                                {currentUser.email}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <h5 className="cartd-title">Olvasói adatok</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Kártyaszám</div>
                                {currentReader.kartyaszam}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Név</div>
                                {currentReader.nev}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Értesítési email</div>
                                {currentReader.email}
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Telefonszám</div>
                                {currentReader.tel}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}