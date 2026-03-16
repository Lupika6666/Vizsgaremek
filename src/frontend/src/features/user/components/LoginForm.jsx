import { useState } from "react";

export function LoginForm({ onLogin }) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleLogin = (e) => {
        //oldal újratöltés megakadályozása (submit gomb alapértelmezetten ezt eredményezné)
        e.preventDefault();

        //validáció
        if (userEmail.trim() === "" || userPassword.trim() === "") {
            return;
        }

        onLogin(userEmail, userPassword);
    }

    return (
        <form className="bg-light shadow" onSubmit={handleLogin}>
            <h3 className="text-center mb-3">Bejelentkezés</h3>

            {/* email */}
            <div className="p-3 form-group">
                <label className="form-label" htmlFor="email">Email cím:</label>
                <input className="form-control" type="email" required id="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
            </div>

            {/* jelszó */}
            <div className="p-3 form-group">
                <label className="form-label" htmlFor="password">Jelszó:</label>
                <input className="form-control" type="password" required id="password" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
            </div>

            {/* belépés gomb */}
            <div className="p-3">
                <button type="submit" className="btn btn-primary w-100">Belépés</button>
            </div>

        </form>
    )
}
