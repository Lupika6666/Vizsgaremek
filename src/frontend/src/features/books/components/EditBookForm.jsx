import { useState } from "react"
import { Book } from "../models/Book";
import { useNavigate } from "react-router";

export function EditBookForm({ book, languages, authors, genres, updateBook }) {

    // const nyelv_id = languages.find(item=>item.nev===book.nyelv_id).id;
    // console.log(nyelv_id);

    const [title, setTitle] = useState(book.cim);
    const [isbn, setIsbn] = useState(book.isbn);
    const [year, setYear] = useState(book.publikalas_ev);
    const [desc, setDesc] = useState(book.leiras);
    const [langId, setLangId] = useState(languages.find(item => item.nev === book.nyelv_id).id);
    const [authorId, setAuthorId] = useState(authors.find(item => item.nev === book.szerzo_id).id);
    const [genreId, setGenreId] = useState(genres.find(item => item.nev === book.mufaj_id).id);

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedBook = new Book(book.id, title, isbn, Number(year), desc, Number(langId), Number(authorId), Number(genreId));
        console.log(`szerkesztett konyv`);
        console.log(editedBook);

        updateBook(editedBook);

        navigation("/konyvek");

        // setTitle('');
        // setIsbn('');
        // setYear('');
        // setDesc('');
        // setLangId('');
        // setAuthorId('');
        // setGenreId('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newTitle">Cím</label>
                <input type="text" className="form-control" id="newTitle" value={title} onChange={(e) => setTitle(e.target.value)} required minLength={2} maxLength={50}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newIsbn">ISBN</label>
                <input type="text" className="form-control" id="newIsbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required pattern="[0-9]{13}" title="csak 13 számból állhat"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newYear">Publikálás éve</label>
                <input type="number" className="form-control" id="newYear" value={year} onChange={(e) => setYear(e.target.value)} required min={0} max={new Date().getFullYear()}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="newDesc">Leírás</label>
                <input type="text" className="form-control" id="newDesc" value={desc} onChange={(e) => setDesc(e.target.value)} required maxLength={255}/>
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

            <button type="submit" className="btn btn-primary w-100">Mentés</button>
        </form>
    )
}