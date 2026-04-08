import { Link, NavLink, useNavigate } from "react-router";
import { useUser } from "../features/user/stores/userProvider";
import { toast } from "sonner";

export function NavigationBar() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        toast.info("Sikeres kijelentkezés");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid px-3 px-lg-5">
                    <Link className="navbar-brand">E-Könyvtár</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">

                            {user.isAdmin() && (<li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/konyvek" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Könyvek
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/konyvek">Könyvek</Link></li>
                                    <li><Link className="dropdown-item" to="/nyelvek">Nyelvek</Link></li>
                                    <li><Link className="dropdown-item" to="/szerzok">Szerzők</Link></li>
                                    <li><Link className="dropdown-item" to="/mufajok">Műfajok</Link></li>
                                </ul>
                            </li>)}

                            {!user.isAdmin() && (<li className="nav-item">
                                <NavLink className="nav-link" to="/konyvek">Könyvek</NavLink>
                            </li>)}

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/kolcsonzesek">Kölcsönzések</NavLink>
                            </li>

                            {user.isAdmin() && (<li className="nav-item">
                                <NavLink className="nav-link" to="/olvasok">Olvasók</NavLink>
                            </li>)}

                        </ul>

                        <NavLink className="btn btn-outline-light btn-sm m-3" to="/fiok"><i class="bi bi-person me-2"></i>{user.nev}</NavLink>

                        {user && (
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                <i class="bi bi-box-arrow-right me-2"></i>Kijelentkezés
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}