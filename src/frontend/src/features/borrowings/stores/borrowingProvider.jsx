import { createContext, useContext, useEffect, useState } from "react";
import { borrowingApi } from "../api/borrowingApi";
import { Borrowing } from "../models/Borrowing";

const BorrowingContext = createContext(null);

export function BorrowingProvider({ children }) {
    const [borrowings, setBorrowings] = useState([]);
    const [selectedBorrowing, setSelectedBorrowing] = useState(new Borrowing())
    const [isLoading, setIsLoading] = useState(false);

    const getBorrowings = async () => {
        setIsLoading(true)
        try {
            const data = await borrowingApi.getAll();
            setBorrowings(data);
        }
        catch (error) {
            console.error("Hiba a kölcsönzések lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getBorrowingById = async (id) => {
        setIsLoading(true)
        try {
            const data = await borrowingApi.getById(id);
            setSelectedBorrowing(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott kölcsönzés lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createBorrowing = async (data) => {
        try {
            await borrowingApi.create(data);
            await getBorrowings();
        }
        catch (error) {
            console.error("Hiba az új kölcsönzés felvitele során");
        }
    }

    const updateBorrowing = async (data) => {
        try {
            await borrowingApi.update(data.id, data);
            await getBorrowings();
        }
        catch (error) {
            console.error("Hiba amegadott kölcsönzés szerkesztése során");
        }
    }

    const deleteBorrowing = async (id) => {
        try {
            await borrowingApi.delete(id);
            await getBorrowings();
        }
        catch (error) {
            console.error("Hiba a megadott kölcsönzés törlése során");
        }
    }

    useEffect(
        () => {
            getBorrowings();
        }, []
    )

    return (
        <BorrowingContext.Provider value={{ borrowings, selectedBorrowing, isLoading, getBorrowings, getBorrowingById, createBorrowing, updateBorrowing, deleteBorrowing }}>
            {children}
        </BorrowingContext.Provider>
    )
}

export const useBorrowings = () => {
    const context = useContext(BorrowingContext);

    if (!context) {
        throw new Error("A BorrowingProvider-en belül tudod csak használni a useBorrowings-ot!")
    }

    return context;
}