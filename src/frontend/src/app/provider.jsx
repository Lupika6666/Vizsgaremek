import { RouterProvider } from "react-router";
import { router } from "./router";
import { LanguageProvider } from "../features/languages/stores/languageProvider";
import { AuthorProvider } from "../features/authors/stores/authorProvider";
import { GenreProvider } from "../features/genres/stores/genreProvider";
import { BookProvider } from "../features/books/stores/bookProvider";
import { BookCopyProvider } from "../features/bookCopies/stores/bookCopyProvider";
import { ReaderProvider } from "../features/readers/stores/readerProvider";
import { BorrowingProvider } from "../features/borrowings/stores/borrowingProvider";
import { Toaster } from "sonner";
import { UserProvider } from "../features/user/stores/userProvider";

export function AppProvider() {
    return (
        <UserProvider>
            <LanguageProvider>
                <AuthorProvider>
                    <GenreProvider>
                        <BookProvider>
                            <BookCopyProvider>
                                <ReaderProvider>
                                    <BorrowingProvider>
                                        <Toaster richColors />
                                        <RouterProvider router={router} />
                                    </BorrowingProvider>
                                </ReaderProvider>
                            </BookCopyProvider>
                        </BookProvider>
                    </GenreProvider>
                </AuthorProvider>
            </LanguageProvider>
        </UserProvider>
    );
}