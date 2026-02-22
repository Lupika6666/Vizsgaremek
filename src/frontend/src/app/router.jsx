import { createBrowserRouter } from "react-router";
import { MainLayout } from "../components/MainLayout";
import { HomePage } from "./pages/HomePage";

import { BookListPage } from "./pages/books/BookListPage";
import { BookDetailsPage } from "./pages/books/BookDetailsPage";
import { AddBookPage } from "./pages/books/AddBookPage";
import { BorrowingListPage } from "./pages/borrowings/BorrowingListPage";
import { EditBookPage } from "./pages/books/EditBookPage";
import { DeleteBookPage } from "./pages/books/DeleteBookPage";

import { AuthorListPage } from "./pages/authors/AuthorListPage";
import { EditAuthorPage } from "./pages/authors/EditAuthorPage";
import { DeleteAuthorPage } from "./pages/authors/DeleteAuthorPage";

import { LanguageListPage } from "./pages/languages/LanguageListPage";
import { EditLanguagePage } from "./pages/languages/EditLanguagePage";
import { DeleteLanguagePage } from "./pages/languages/DeleteLanguagePage";

import { GenreListPage } from "./pages/genres/GenreListPage";
import { EditGenrePage } from "./pages/genres/EditGenrePage";
import { DeleteGenrePage } from "./pages/genres/DeleteGenrePage";

import { BookCopyListPage } from "./pages/bookCopies/BookCopyListPage";
import { BookCopyDetailsPage } from "./pages/bookCopies/BookCopyDetailsPage";
import { EditBookCopyPage } from "./pages/bookCopies/EditBookCopyPage";
import { DeleteBookCopyPage } from "./pages/bookCopies/DeleteBookCopyPage";

import { ReaderListPage } from "./pages/readers/ReaderListPage";
import { ReaderDetailsPage } from "./pages/readers/ReaderDetailsPage";
import { AddReaderPage } from "./pages/readers/AddReaderPage";
import { EditReaderPage } from "./pages/readers/EditReaderPage";
import { DeleteReaderPage } from "./pages/readers/DeleteReaderPage";
import { AddBorrowingPage } from "./pages/borrowings/AddBorrowingPage";
import { EditBorrowingPage } from "./pages/borrowings/EditBorrowingPage";
import { DeleteBorrowingPage } from "./pages/borrowings/DeleteBorrowingPage";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },

                {
                    path: "konyvek",
                    children: [
                        {
                            index: true,
                            element: <BookListPage />
                        },

                        {
                            path: ":id",
                            element: <BookDetailsPage />
                        },

                        {
                            path: "uj",
                            element: <AddBookPage />
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditBookPage />
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteBookPage />
                        }
                    ]
                },

                {
                    path: "nyelvek",
                    children: [
                        {
                            index: true,
                            element: <LanguageListPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditLanguagePage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteLanguagePage/>
                        }
                    ]
                },

                {
                    path: "szerzok",
                    children: [
                        {
                            index: true,
                            element: <AuthorListPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditAuthorPage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteAuthorPage/>
                        }
                    ]
                },

                {
                    path: "mufajok",
                    children: [
                        {
                            index: true,
                            element: <GenreListPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditGenrePage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteGenrePage/>
                        }
                    ]
                },

                {
                    path: "peldanyok",
                    children: [
                        {
                            index: true,
                            element: <BookCopyListPage/>
                        },

                        {
                            path: ":id",
                            element: <BookCopyDetailsPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditBookCopyPage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteBookCopyPage/>
                        }
                    ]
                },

                {
                    path: "kolcsonzesek",
                    children: [
                        {
                            index: true,
                            element: <BorrowingListPage />
                        },

                        {
                            path: "uj",
                            element: <AddBorrowingPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditBorrowingPage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteBorrowingPage/>
                        }
                    ]
                },

                {
                    path: "olvasok",
                    children: [
                        {
                            index: true,
                            element: <ReaderListPage/>
                        },

                        {
                            path: ":id",
                            element: <ReaderDetailsPage/>
                        },

                        {
                            path: "uj",
                            element: <AddReaderPage/>
                        },

                        {
                            path: "szerkesztes/:id",
                            element: <EditReaderPage/>
                        },

                        {
                            path: "torles/:id",
                            element: <DeleteReaderPage/>
                        }
                    ]
                }
            ]
        }
    ]
)