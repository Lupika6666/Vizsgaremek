import { RouterProvider } from "react-router";
import { router } from "./router";

export function AppProvider(){
    return(
        <RouterProvider router={router}/>
    );
}