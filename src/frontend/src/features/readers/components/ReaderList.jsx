import { useEffect, useState } from "react";
import { Link } from "react-router";

export function ReaderList({ readers }) {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [searchedReaders, setSearchedReaders] = useState([]);

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
                setSearchedReaders([]);
            }
            else if (cardNumber == "0") {
                setSearchedReaders(readers);
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
                setSearchedReaders(filteredReaders)
            }

        }, [cardNumber, name, email]
    )

    return (
        <div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="searchCardNumber">Kártyaszám</label>
                <input onChange={handleSearch} type="number" className="form-control" id="searchCardNumber" value={cardNumber} />

                <label className="input-group-text" htmlFor="searchName">Név</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchName" value={name} />

                <label className="input-group-text" htmlFor="searchEmail">Email</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchEmail" value={email} />
            </div>
            <p>A kártyaszámhoz "0"-t írva az összes elem listázható.</p>

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
                    {searchedReaders.map(
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
        </div>
    )
}
