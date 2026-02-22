import { Link, useParams } from "react-router";
import { useGenres } from "../../../features/genres/stores/genreProvider";

export function DeleteGenrePage() {
    const { id } = useParams();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    const handleDeleteButton = () => {
        deleteGenre(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/mufajok">Igen</Link>
            <Link className="btn btn-secondary" to="/mufajok">Vissza</Link>
        </div>
    )
}
