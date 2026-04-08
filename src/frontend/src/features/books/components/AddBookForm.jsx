import { useState } from "react"
import { Book } from "../models/Book";

export function AddBookForm({ languages, authors, genres, createBook }) {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const [desc, setDesc] = useState('');
    const [langId, setLangId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genreId, setGenreId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const book = new Book(0, title, isbn, Number(year), desc, Number(langId), Number(authorId), Number(genreId));
        console.log(`uj konyv`);
        console.log(book);

        createBook(book);

        setTitle('');
        setIsbn('');
        setYear('');
        setDesc('');
        setLangId('');
        setAuthorId('');
        setGenreId('');
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Új könyv adatainak megadása</h5>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newTitle">Cím</label>
                        <input type="text" className="form-control" id="newTitle" value={title} onChange={(e) => setTitle(e.target.value)} required minLength={2} maxLength={50} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newIsbn">ISBN</label>
                        <input type="text" className="form-control" id="newIsbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required pattern="[0-9]{13}" title="csak 13 számból állhat" />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newYear">Év</label>
                        <input type="number" className="form-control" id="newYear" value={year} onChange={(e) => setYear(e.target.value)} required min={0} max={new Date().getFullYear()} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newDesc">Leírás</label>
                        <textarea className="form-control" id="newDesc" value={desc} onChange={(e) => setDesc(e.target.value)} required maxLength={255} />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newLanguage">Nyelv</label>
                        <select className="form-control" id="newLanguage" value={langId} onChange={(e) => setLangId(e.target.value)} required>
                            <option value="" disabled>Válassz nyelvet</option>
                            {
                                languages.map(
                                    item => (
                                        <option key={item.id} value={item.id}>{item.nev}</option>
                                    )
                                )
                            }
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newAuthor">Szerző</label>
                        <select className="form-control" id="newAuthor" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                            <option value="" disabled>Válassz szerzőt</option>
                            {
                                authors.map(
                                    item => (
                                        <option key={item.id} value={item.id}>{item.nev}</option>
                                    )
                                )
                            }
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="newGenre">Műfaj</label>
                        <select className="form-control" id="newGenre" value={genreId} onChange={(e) => setGenreId(e.target.value)} required>
                            <option value="" disabled>Válassz műfajt</option>
                            {
                                genres.map(
                                    item => (
                                        <option key={item.id} value={item.id}>{item.nev}</option>
                                    )
                                )
                            }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-outline-success btn-sm" title="mentés"><i class="bi bi-check-lg"></i></button>
                </form>
            </div>
        </div>
    )
}