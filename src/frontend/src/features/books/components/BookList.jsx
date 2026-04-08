import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PaginationElement } from "../../../components/PaginationElement";
import { useUser } from "../../user/stores/userProvider";

export function BookList({ books, page }) {
    const { user } = useUser();

    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const [lang, setLang] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [searchedBooks, setSearchedBooks] = useState(books);
    const [elementsPerPage, setElementsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(Math.ceil(books.length / 10));

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
                setSearchedBooks(books);
                setMaxPage(Math.ceil(books.length / elementsPerPage));
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
                setMaxPage(Math.ceil(filteredBooks.length / elementsPerPage));
            }

        }, [title, isbn, year, lang, author, genre]
    )

    return (
        <div>
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">Szűrés</h5>
                    <div className="row">
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchTitle">Cím</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchTitle" value={title} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchIsbn">ISBN</label>
                                <input onChange={handleSearch} type="number" className="form-control" id="searchIsbn" value={isbn} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchYear">Év</label>
                                <input onChange={handleSearch} type="number" className="form-control" id="searchYear" value={year} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchLanguage">Nyelv</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchLanguage" value={lang} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchAuthor">Szerző</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchAuthor" value={author} />
                            </div>
                        </div>
                        <div className="col col-12 col-md-4 col-xl-2">
                            <div className="input-group mb-2">
                                <label className="input-group-text" htmlFor="searchGenre">Műfaj</label>
                                <input onChange={handleSearch} type="text" className="form-control" id="searchGenre" value={genre} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow p-3">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
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
                            {searchedBooks.slice((page - 1) * elementsPerPage, page * elementsPerPage).map(
                                (item) => (
                                    <tr key={item.id}>
                                        <td>{item.cim}</td>
                                        <td>{item.isbn}</td>
                                        <td>{item.publikalas_ev}</td>
                                        <td>{item.nyelv_id}</td>
                                        <td>{item.szerzo_id}</td>
                                        <td>{item.mufaj_id}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/konyvek/${item.id}`} title="adatlap"><i className="bi bi-book"></i></Link>
                                            <Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/peldanyok?konyvid=${item.id}`} title="példányok"><i className="bi bi-bookshelf"></i></Link>
                                            {user.isAdmin() && (<Link className="btn btn-outline-primary btn-sm m-1 my-lg-0" to={`/konyvek/szerkesztes/${item.id}`} title="szerkesztés"><i className="bi bi-pencil-square"></i></Link>)}
                                            {user.isAdmin() && (<Link className="btn btn-outline-danger btn-sm m-1 my-lg-0" to={`/konyvek/torles/${item.id}`} title="törlés"><i className="bi bi-trash"></i></Link>)}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <PaginationElement page={page} maxPage={maxPage} route={"konyvek"} />
            </div>

        </div>
    )
}
