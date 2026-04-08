import { useState } from "react"
import { Reader } from "../models/Reader";
import { getRandomIntInclusive } from "../../../utils/getRandomIntInclusive";

export function AddReaderForm({ readers, createReader }) {
    const [cardNumber, setCardNumber] = useState(
        ()=>{
            let number = 0;
            let numberInUse = true;
            while(numberInUse){
                number = getRandomIntInclusive(100000, 999999);
                const index = readers.findIndex(item => item.kartyaszam == number);
                if(index == -1) numberInUse = false;
            }
            return number;
        }
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const reader = new Reader(cardNumber, name, email, phone);

        createReader(reader);

        setCardNumber('');
        setName('');
        setEmail('');
        setPhone('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5>Új olvasó felvétele</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newCardNumber">Kártyaszám</label>
                        <input type="number" className="form-control" id="newCardNumber" value={cardNumber} disabled />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newName">Név</label>
                        <input type="text" className="form-control" id="newName" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} maxLength={50} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newEmail">Email</label>
                        <input type="email" className="form-control" id="newEmail" value={email} onChange={(e) => setEmail(e.target.value)} required minLength={2} maxLength={50} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newPhone">Telefonszám</label>
                        <input type="text" className="form-control" id="newPhone" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={12} />
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i className="bi bi-check-lg"></i></button>
                </form>
            </div>

        </div>

    )
}