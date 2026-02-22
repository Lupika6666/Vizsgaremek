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

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/konyvek" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Könyvek
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/konyvek">Könyvek</Link></li>
                                    <li><Link className="dropdown-item" to="/peldanyok">Példányok</Link></li>
                                    <li><Link className="dropdown-item" to="/nyelvek">Nyelvek</Link></li>
                                    <li><Link className="dropdown-item" to="/szerzok">Szerzők</Link></li>
                                    <li><Link className="dropdown-item" to="/mufajok">Műfajok</Link></li>
                                </ul>
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