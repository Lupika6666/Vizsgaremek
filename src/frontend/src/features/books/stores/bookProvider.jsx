import { createContext, useContext, useEffect, useState } from "react";
import { bookApi } from "../api/bookApi";
import { Book } from "../models/Book";
import { toast } from "sonner";
import { toastErrorNotifier } from "../../../utils/toastErrorNotifier";

const BookContext = createContext(null);

export function BookProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(new Book())
    const [isLoading, setIsLoading] = useState(false);

    const getBooks = async () => {
        setIsLoading(true)
        try {
            const data = await bookApi.getAll();
            setBooks(data);
        }
        catch (error) {
            console.error("Hiba a könyvek lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getBookById = async (id) => {
        setIsLoading(true)
        try {
            const data = await bookApi.getById(id);
            setSelectedBook(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott könyv lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createBook = async (book) => {
        try {
            const response = await bookApi.create(book);
            await getBooks();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba az új könyv felvitele során");
            toastErrorNotifier(error);
        }
    }

    const updateBook = async (book) => {
        try {
            const response = await bookApi.update(book.id, book);
            await getBooks();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba amegadott könyv szerkesztése során");
            toastErrorNotifier(error);
        }
    }

    const deleteBook = async (id) => {
        try {
            const response = await bookApi.delete(id);
            await getBooks();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott könyv törlése során");
            toastErrorNotifier(error);
        }
    }

    useEffect(
        () => {
            getBooks();
        }, []
    )

    return (
        <BookContext.Provider value={{ books, selectedBook, isLoading, getBooks, getBookById, createBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    )
}

export const useBooks = () => {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("A BookProvider-en belül tudod csak használni a useBooks-ot!")
    }

    return context;
}