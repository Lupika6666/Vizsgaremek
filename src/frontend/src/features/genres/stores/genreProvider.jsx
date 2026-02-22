import { createContext, useContext, useEffect, useState } from "react";
import { Genre } from "../models/Genre";
import { genreApi } from "../api/genreApi";

const GenreContext = createContext(null);

export function GenreProvider({ children }) {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(new Genre());
    const [isLoading, setIsLoading] = useState(false);

    const getGenres = async () => {
        setIsLoading(true);
        try {
            const data = await genreApi.getAll();
            setGenres(data);
        }
        catch (error) {
            console.error("Hiba a műfajok lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getGenreById = async (id) => {
        setIsLoading(true);
        try {
            const data = await genreApi.getById();
            setSelectedGenre(data);
        }
        catch (error) {
            console.error("Hiba a kiválasztott műfaj lekérése során", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const createGenre = async (genreName) => {
        try {
            await genreApi.create(genreName);
            await getGenres();
        }
        catch (error) {
            console.error("Hiba az új műfaj felvitele során", error);
        }
    }

    const updateGenre = async (id, genreName) => {
        try {
            await genreApi.update(id, genreName);
            await getGenres();
        }
        catch (error) {
            console.error("Hiba a megadott műfaj szerkesztése során", error);
        }
    }

    const deleteGenre = async (id) => {
        try {
            await genreApi.delete(id);
            await getGenres();
        }
        catch (error) {
            console.error("Hiba a megadott műfaj törlése során", error);
        }
    }

    useEffect(
        () => {
            getGenres();
        }, []
    )

    return (
        <GenreContext.Provider value={{ genres, selectedGenre, isLoading, getGenres, getGenreById, createGenre, updateGenre, deleteGenre }}>
            {children}
        </GenreContext.Provider>
    )
}

export const useGenres = () => {
    const context = useContext(GenreContext);

    if (!context) {
        throw new Error("A GenreProvider-en belül tudod csak használni a useGenres-ot!")
    }

    return context;
}