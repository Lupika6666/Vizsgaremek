import { createContext, useContext, useEffect, useState } from "react";
import { readerApi } from "../api/readerApi";
import { Reader } from "../models/Reader";
import { toast } from "sonner";
import { toastErrorNotifier } from "../../../utils/toastErrorNotifier";

const ReaderContext = createContext(null);

export function ReaderProvider({ children }) {
    const [readers, setReaders] = useState([]);
    const [selectedReader, setSelectedReader] = useState(new Reader())
    const [isLoading, setIsLoading] = useState(false);

    const getReaders = async () => {
        setIsLoading(true)
        try {
            const data = await readerApi.getAll();
            setReaders(data);
        }
        catch (error) {
            console.error("Hiba az olvasók lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getReaderById = async (id) => {
        setIsLoading(true)
        try {
            const data = await readerApi.getById(id);
            setSelectedReader(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott olvasó lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createReader = async (data) => {
        try {
            const response = await readerApi.create(data);
            await getReaders();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba az új olvasó felvitele során");
            toastErrorNotifier(error);
        }
    }

    const updateReader = async (data) => {
        try {
            const response = await readerApi.update(data.kartyaszam, data);
            await getReaders();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba amegadott olvasó szerkesztése során");
            toastErrorNotifier(error);
        }
    }

    const deleteReader = async (id) => {
        try {
            const response = await readerApi.delete(id);
            await getReaders();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott olvasó törlése során");
            toastErrorNotifier(error);
        }
    }

    useEffect(
        () => {
            getReaders();
        }, []
    )

    return (
        <ReaderContext.Provider value={{ readers, selectedReader, isLoading, getReaders, getReaderById, createReader, updateReader, deleteReader }}>
            {children}
        </ReaderContext.Provider>
    )
}

export const useReaders = () => {
    const context = useContext(ReaderContext);

    if (!context) {
        throw new Error("A ReaderProvider-en belül tudod csak használni a useReaders-ot!")
    }

    return context;
}
