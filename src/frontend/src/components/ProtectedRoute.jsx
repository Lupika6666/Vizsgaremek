import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "../features/user/stores/userProvider";
import { AccessDeniedPath } from "./AccessDeniedPath";

export function ProtectedRoute({ allowedRoles }){
    const { token, user, logout } = useUser();
    const location = useLocation();
    
    if(!token || !user){
        return <Navigate to="/login"/>
    }

    if (allowedRoles && !allowedRoles.includes(user.szerepkor)) {
        return <AccessDeniedPath />
    }

    return <Outlet/>
}