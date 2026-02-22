import { createContext, useContext, useEffect, useState } from "react";
import { bookApi } from "../api/bookApi";
import { Book } from "../models/Book";

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
            await bookApi.create(book);
            await getBooks();
        }
        catch (error) {
            console.error("Hiba az új könyv felvitele során");
        }
    }

    const updateBook = async (book) => {
        try {
            await bookApi.update(book.id, book);
            await getBooks();
        }
        catch (error) {
            console.error("Hiba amegadott könyv szerkesztése során");
        }
    }

    const deleteBook = async (id) => {
        try {
            await bookApi.delete(id);
            await getBooks();
        }
        catch (error) {
            console.error("Hiba a megadott könyv törlése során");
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