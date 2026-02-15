import { useEffect, useState } from "react";
import { bookApi } from "../../features/books/api/bookApi";
import { BookList } from "../../features/books/components/BookList";
import { Link } from "react-router";

export function BookListPage() {
    const [books, setBooks] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const loadBooks = async () => {
        try {
            const books = await bookApi.getAll();
            console.log(books);
            setBooks(books);
        }
        catch (error) {
            console.error("Hiba: " + error);
        }
    }

    useEffect(
        () => {
            loadBooks()
        }, []
    )

    return (
        <div>
            <BookList books={books} />
            <Link className="btn btn-primary" to="/konyvek/uj">Új könyv felvétele</Link>
        </div>
    )
}