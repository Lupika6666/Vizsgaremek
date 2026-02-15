import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { bookApi } from "../../features/books/api/bookApi";
import { BookDetails } from "../../features/books/components/BookDetails";
import { Book } from "../../features/books/models/Book";

export function BookDetailsPage() {
    const { id } = useParams();
    const [book, setBook] = useState('');

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

    useEffect(
        ()=>{
            loadBook()
        }, []
    )

    return (
        <div>
            <BookDetails book={book}/>
            <Link className="btn btn-primary" to={`/konyvek/szerkesztes/${id}`}>Szerkesztés</Link>
            <Link className="btn btn-danger" to={`/konyvek/torles/${id}`}>Törlés</Link>
            <Link className="btn btn-secondary" to="/konyvek">Vissza</Link>
        </div>
    )
}