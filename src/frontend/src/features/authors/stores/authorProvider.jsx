import { createContext, useContext, useEffect, useState } from "react";
import { Author } from "../models/Author";
import { authorApi } from "../api/authorApi";
import { toast } from "sonner";
import { toastErrorNotifier } from "../../../utils/toastErrorNotifier";

const AuthorContext = createContext(null);

export function AuthorProvider({ children }) {
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState(new Author());
    const [isLoading, setIsLoading] = useState(false);

    const getAuthors = async () => {
        setIsLoading(true);
        try {
            const data = await authorApi.getAll();
            setAuthors(data);
        }
        catch (error) {
            console.error("Hiba a szerzők lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getAuthorById = async (id) => {
        setIsLoading(true);
        try {
            const data = await authorApi.getById(id);
            setSelectedAuthor(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott szerző lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createAuthor = async (authorName) => {
        try {
            const response = await authorApi.create(authorName);
            await getAuthors();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba az új szerző felvitele során", error);
            toastErrorNotifier(error);
        }
    }

    const updateAuthor = async (id, authorName) => {
        try {
            const response = await authorApi.update(id, authorName);
            await getAuthors();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott szerző szerkesztése során", error);
            toastErrorNotifier(error);
        }
    }

    const deleteAuthor = async (id) => {
        try {
            const response = await authorApi.delete(id);
            await getAuthors();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott szerző törlése során", error);
            toastErrorNotifier(error);
        }
    }

    useEffect(
        () => {
            getAuthors();
        }, []
    )

    return (
        <AuthorContext.Provider value={{ authors, selectedAuthor, isLoading, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor }}>
            {children}
        </AuthorContext.Provider>
    )
}

export const useAuthors = () => {
    const context = useContext(AuthorContext);

    if (!context) {
        throw new Error("Az AuthorProvider-en belül tudod csak használni a useAuthors-ot!")
    }

    return context;
}