import { createBrowserRouter } from "react-router";
import { MainLayout } from "../components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { BookListPage } from "./pages/BookListPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { AddBookPage } from "./pages/AddBookPage";
import { BorrowingListPage } from "./pages/BorrowingListPage";
import { ReaderListPage } from "./pages/ReaderListPage";
import { EditBookPage } from "./pages/EditBookPage";
import { DeleteBookPage } from "./pages/DeleteBookPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <HomePage/>
                },

                {
                    path: "konyvek",
                    element: <BookListPage/>
                },

                {
                    path: "konyvek/:id",
                    element: <BookDetailsPage/>
                },

                {
                    path: "konyvek/uj",
                    element: <AddBookPage/>
                },

                {
                    path: "konyvek/szerkesztes/:id",
                    element: <EditBookPage/>
                },

                {
                    path: "konyvek/torles/:id",
                    element: <DeleteBookPage/>
                },

                {
                    path: "kolcsonzesek",
                    element: <BorrowingListPage/>
                },

                {
                    path: "olvasok",
                    element: <ReaderListPage/>
                }
            ]
        }
    ]
)