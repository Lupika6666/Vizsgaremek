import { useEffect, useState } from "react";
import { authorApi } from "../../features/authors/api/authorApi";
import { bookApi } from "../../features/books/api/bookApi";
import { languageApi } from "../../features/languages/api/languageApi";
import { genreApi } from "../../features/genres/api/genreApi";
import { Link, useParams } from "react-router";
import { EditBookForm } from "../../features/books/components/EditBookForm";
import { BookDetails } from "../../features/books/components/BookDetails";

export function EditBookPage() {
    const {id} = useParams();
    const [book, setBook] = useState('');
    
    const [languages, setLanguages] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const loadBook = async () => {
        try {
            const book = await bookApi.getById(id);
            console.log(book);
            setBook(book);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

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
            loadBook();
            loadLanguages();
            loadAuthors();
            loadGenres();
        }, []
    )

    const updateBook = async (id, book) => {
        try {
            await bookApi.update(id, book);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    return (
        <div className="row">
            <div className="col col-6">
                <BookDetails book={book}/>
            </div>
            <div className="col col-6">
                <EditBookForm book={book} languages={languages} authors={authors} genres={genres} updateBook={updateBook}/>
                <Link className="btn btn-secondary" to={`/konyvek/${id}`}>Vissza</Link>
            </div>
            
        </div>
    )
}