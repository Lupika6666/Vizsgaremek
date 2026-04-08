import { NavLink } from "react-router";

export function NotFoundPath(){
    return(
        <div>
            <h1>A keresett oldal nem található</h1>
            <NavLink className="text-primary" to="/">Vissza a főoldalra</NavLink>
        </div>
    )
}