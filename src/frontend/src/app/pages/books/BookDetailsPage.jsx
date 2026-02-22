import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { BookDetails } from "../../../features/books/components/BookDetails";
import { useBooks } from "../../../features/books/stores/bookProvider";
import { useBookCopies } from "../../../features/bookCopies/stores/bookCopyProvider";
import { AddBookCopyForm } from "../../../features/bookCopies/components/AddBookCopyForm";

export function BookDetailsPage() {
    const { id } = useParams();
    const { books, selectedBook, isLoading: isLoadingBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = useBooks();
    const { bookCopies, selectedBookCopy, isLoading, getBookCopies, getBookCopyById, createBookCopy, updateBookCopy, deleteBookCopy } = useBookCopies();

    useEffect(
        ()=>{
            getBookById(id)
        }, []
    );

    return (
        <div>
            <BookDetails book={selectedBook}/>
            <Link className="btn btn-primary m-2" to={`/konyvek/szerkesztes/${id}`}>Szerkesztés</Link>
            <Link className="btn btn-danger m-2" to={`/konyvek/torles/${id}`}>Törlés</Link>
            <Link className="btn btn-secondary m-2" to="/konyvek">Vissza</Link>
            <Link className="btn btn-secondary m-2" to={`/peldanyok?konyvid=${id}`}>Példányok</Link>
            <h4>Új példány hozzáadása</h4>
            <AddBookCopyForm selectedBookId={id} createBookCopy={createBookCopy}/>
        </div>
    )
}