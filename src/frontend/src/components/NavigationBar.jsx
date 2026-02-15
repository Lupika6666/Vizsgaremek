import { Link, NavLink } from "react-router";

export function NavigationBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand">E-Könyvtár</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Főoldal</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/konyvek">Könyvek</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/kolcsonzesek">Kölcsönzések</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/olvasok">Olvasók</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}