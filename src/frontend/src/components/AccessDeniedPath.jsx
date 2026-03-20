import { NavLink } from "react-router";

export function AccessDeniedPath(){
    return(
        <div>
            <h1>A keresett oldal eléréséhez nincs jogosultságod!</h1>
            <NavLink className="text-primary" to="/login">Vissza a bejelentkezéshez</NavLink>
        </div>
    );
}