import { useEffect, useState } from "react";
import { Link } from "react-router";

export function BookList({ books }) {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const [lang, setLang] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleSearch = (e) => {
        const inputField = e.target.id;
        switch (inputField) {
            case "searchTitle":
                setTitle(e.target.value);
                break;
            case "searchIsbn":
                setIsbn(e.target.value);
                break;
            case "searchYear":
                setYear(e.target.value);
                break;
            case "searchLanguage":
                setLang(e.target.value);
                break;
            case "searchAuthor":
                setAuthor(e.target.value);
                break;
            case "searchGenre":
                setGenre(e.target.value);
                break;
        }
    }

    useEffect(
        () => {
            if (!title && !isbn && !year && !lang && !author && !genre) {
                setSearchedBooks([]);
            }
            else if (title == "*") {
                setSearchedBooks(books);
            }
            else {
                let filteredBooks = books;
                if (title) {
                    filteredBooks = filteredBooks.filter(item => item.cim.toLowerCase().includes(title.toLowerCase()));
                }
                if (isbn) {
                    filteredBooks = filteredBooks.filter(item => item.isbn.startsWith(isbn));
                }
                if (year) {
                    filteredBooks = filteredBooks.filter(item => String(item.publikalas_ev).startsWith(year));
                }
                if (lang) {
                    filteredBooks = filteredBooks.filter(item => item.nyelv_id.startsWith(lang));
                }
                if (author) {
                    filteredBooks = filteredBooks.filter(item => item.szerzo_id.toLowerCase().includes(author.toLowerCase()));
                }
                if (genre) {
                    filteredBooks = filteredBooks.filter(item => item.mufaj_id.includes(genre));
                }
                setSearchedBooks(filteredBooks);
            }

        }, [title, isbn, year, lang, author, genre]
    )

    return (
        <div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="searchTitle">Cím</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchTitle" value={title} />

                <label className="input-group-text" htmlFor="searchIsbn">ISBN</label>
                <input onChange={handleSearch} type="number" className="form-control" id="searchIsbn" value={isbn} />

                <label className="input-group-text" htmlFor="searchYear">Év</label>
                <input onChange={handleSearch} type="number" className="form-control" id="searchYear" value={year} />

                <label className="input-group-text" htmlFor="searchLanguage">Nyelv</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchLanguage" value={lang} />

                <label className="input-group-text" htmlFor="searchAuthor">Szerző</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchAuthor" value={author} />

                <label className="input-group-text" htmlFor="searchGenre">Műfaj</label>
                <input onChange={handleSearch} type="text" className="form-control" id="searchGenre" value={genre} />
            </div>
            <p>A címhez "*"-ot írva az összes elem listázható.</p>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cím</th>
                        <th>ISBN</th>
                        <th>Év</th>
                        <th>Nyelv</th>
                        <th>Szerző</th>
                        <th>Műfaj</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedBooks.map(
                        (item) => (
                            <tr key={item.id}>
                                <td>{item.cim}</td>
                                <td>{item.isbn}</td>
                                <td>{item.publikalas_ev}</td>
                                <td>{item.nyelv_id}</td>
                                <td>{item.szerzo_id}</td>
                                <td>{item.mufaj_id}</td>
                                <td>
                                    <Link className="btn btn-primary" to={`/konyvek/${item.id}`}>Adatlap</Link>
                                    <Link className="btn btn-danger" to={`/konyvek/torles/${item.id}`}>Törlés</Link>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}
