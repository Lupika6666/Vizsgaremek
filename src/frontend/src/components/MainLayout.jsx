import { Outlet } from "react-router";
import { NavigationBar } from "./NavigationBar";

export function MainLayout(){
    return(
        <div>
            <NavigationBar/>
            <Outlet/>
        </div>
    )
}