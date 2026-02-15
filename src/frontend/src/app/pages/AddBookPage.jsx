import { useEffect, useState } from "react";
import { authorApi } from "../../features/authors/api/authorApi";
import { AddBookForm } from "../../features/books/components/AddBookForm";
import { bookApi } from "../../features/books/api/bookApi";
import { languageApi } from "../../features/languages/api/languageApi";
import { genreApi } from "../../features/genres/api/genreApi";
import { Link } from "react-router";

export function AddBookPage() {
    
    const [languages, setLanguages] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const loadLanguages = async () => {
        try {
            const languages = await languageApi.getAll();
            console.log(languages);
            setLanguages(languages);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    const loadAuthors = async () => {
        try {
            const authors = await authorApi.getAll();
            console.log(authors);
            setAuthors(authors);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    const loadGenres = async () => {
        try {
            const genres = await genreApi.getAll();
            console.log(genres);
            setGenres(genres);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    useEffect(
        () => {
            loadLanguages();
            loadAuthors();
            loadGenres();
        }, []
    )

    const createBook = async (book) => {
        try {
            await bookApi.create(book);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    return (
        <div>
            <AddBookForm languages={languages} authors={authors} genres={genres} createBook={createBook} />
            <Link className="btn btn-secondary" to="/konyvek">Vissza</Link>
        </div>
    )
}