import { createContext, useContext, useEffect, useState } from "react";
import { Language } from "../models/Language";
import { languageApi } from "../api/languageApi";
import { toast } from "sonner";
import { toastErrorNotifier } from "../../../utils/toastErrorNotifier";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(new Language());
    const [isLoading, setIsLoading] = useState(false);

    const getLanguages = async () => {
        setIsLoading(true);
        try {
            const data = await languageApi.getAll();
            setLanguages(data);
        }
        catch (error) {
            console.error("Hiba a nyelvek lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getLanguageById = async (id) => {
        setIsLoading(true);
        try {
            const data = await languageApi.getById();
            setSelectedLanguage(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott nyelv lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createLanguage = async (languageName) => {
        try {
            const response = await languageApi.create(languageName);
            await getLanguages();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba az új nyelv felvitele során", error);
            toastErrorNotifier(error);
        }
    }

    const updateLanguage = async (id, languageName) => {
        try {
            const response = await languageApi.update(id, languageName);
            await getLanguages();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott nyelv szerkesztése során", error);
            toastErrorNotifier(error);
        }
    }

    const deleteLanguage = async (id) => {
        try {
            const response = await languageApi.delete(id);
            await getLanguages();
            toast.success(response.data.valasz);
        }
        catch (error) {
            console.error("Hiba a megadott nyelv törlése során", error);
            toastErrorNotifier(error);
        }
    }

    useEffect(
        () => {
            getLanguages();
        }, []
    )

    return (
        <LanguageContext.Provider value={{ languages, selectedLanguage, isLoading, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguages = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("A LanguageProvider-en belül tudod csak használni a useLanguages-ot!")
    }

    return context;
}