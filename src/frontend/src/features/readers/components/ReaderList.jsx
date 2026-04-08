import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PaginationElement } from "../../../components/PaginationElement";

export function ReaderList({ readers, page }) {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [searchedReaders, setSearchedReaders] = useState(readers);
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(Math.ceil(readers.length / 10));

    const handleSearch = (e) => {
        const inputField = e.target.id;
        switch (inputField) {
            case "searchCardNumber":
                setCardNumber(e.target.value);
                break;
            case "searchName":
                setName(e.target.value);
                break;
            case "searchEmail":
                setEmail(e.target.value);
                break;
        }
    }

    useEffect(
        () => {
            if (!cardNumber && !name && !email) {
                setSearchedReaders(readers);
                setMaxPage(Math.ceil(readers.length / elementsPerPage));
            }
            else {
                let filteredReaders = readers;
                if (cardNumber) {
                    filteredReaders = filteredReaders.filter(item => String(item.kartyaszam).startsWith(cardNumber));
                }
                if (name) {
                    filteredReaders = filteredReaders.filter(item => item.nev.toLowerCase().includes(name.toLowerCase()));
                }
                if (email) {
                    filteredReaders = filteredReaders.filter(item => item.email.includes(email));
                }
                setSearchedReaders(filteredReaders);
                setMaxPage(Math.ceil(filteredReaders.length / elementsPerPage));
            }

        }, [cardNumber, name, email]
    )

    return (
        <div>
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">Szűrés</h5>
                    <div className="row">
                        <div className="col col-12 col-md-4">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchCardNumber">Kártyaszám</label>
                                <input onChange={handleSearch} type="number" className="form-control" id="searchCardNumber" value={cardNumber} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchName">Név</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchName" value={name} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchEmail">Email</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchEmail" value={email} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow p-3">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
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
                            {searchedReaders.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
                                (item) => (
                                    <tr key={item.kartyaszam}>
                                        <td>{item.kartyaszam}</td>
                                        <td>{item.nev}</td>
                                        <td>{item.email}</td>
                                        <td>{item.tel}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/olvasok/${item.kartyaszam}`} title="adatlap"><i className="bi bi-info-lg"></i></Link>
                                            <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/kolcsonzesek?kartyaszam=${item.kartyaszam}`} title="kölcsönzések"><i className="bi bi-person-lines-fill"></i></Link>
                                            <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/olvasok/szerkesztes/${item.kartyaszam}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>
                                            <Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/olvasok/torles/${item.kartyaszam}`} title="törlés"><i className="bi bi-trash"></i></Link>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationElement page={page} maxPage={maxPage} route={"olvasok"} />
            </div>

        </div>
    )
}
