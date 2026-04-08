import { Outlet } from "react-router";
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";

export function MainLayout() {
    return (
        <div id="mainLayout">
            <NavigationBar />
            <div className="p-3 px-lg-5">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}