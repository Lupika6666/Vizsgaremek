import { createContext, useContext, useEffect, useState } from "react";
import { bookCopyApi } from "../api/bookCopyApi";
import { BookCopy } from "../models/BookCopy";
import { toast } from "sonner";
import { toastErrorNotifier } from "../../../utils/toastErrorNotifier";

const BookCopyContext = createContext(null);

export function BookCopyProvider({ children }) {
    const [bookCopies, setBookCopies] = useState([]);
    const [selectedBookCopy, setSelectedBookCopy] = useState(new BookCopy())
    const [isLoading, setIsLoading] = useState(false);

    const getBookCopies = async () => {
        setIsLoading(true)
        try {
            const data = await bookCopyApi.getAll();
            setBookCopies(data);
        }
        catch (error) {
            console.error("Hiba a példányok lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getBookCopyById = async (id) => {
        setIsLoading(true)
        try {
            const data = await bookCopyApi.getById(id);
            setSelectedBookCopy(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott példány lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createBookCopy = async (data) => {
        try {
            const response = await bookCopyApi.create(data);
            await getBookCopies();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba az új példány felvitele során");
            toastErrorNotifier(error);
        }
    }

    const updateBookCopy = async (data) => {
        try {
            const response = await bookCopyApi.update(data.id, data);
            await getBookCopies();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba amegadott példány szerkesztése során");
            toastErrorNotifier(error);
        }
    }

    const deleteBookCopy = async (id) => {
        try {
            const response = await bookCopyApi.delete(id);
            await getBookCopies();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott példány törlése során");
            toastErrorNotifier(error);
        }
    }

    useEffect(
        () => {
            getBookCopies();
        }, []
    )

    return (
        <BookCopyContext.Provider value={{ bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy }}>
            {children}
        </BookCopyContext.Provider>
    )
}

export const useBookCopies = () => {
    const context = useContext(BookCopyContext);

    if (!context) {
        throw new Error("A BookCopyProvider-en belül tudod csak használni a useBookCopies-ot!")
    }

    return context;
}