import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "../features/user/stores/userProvider";

export function ProtectedRoute(){
    const { token, tokenExp, logout } = useUser();
    const location = useLocation();
    
    if(!token){
        return <Navigate to="/login"/>
    }

    return <Outlet/>
}