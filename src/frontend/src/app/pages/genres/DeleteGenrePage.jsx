import { Link, useParams } from "react-router";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteGenrePage() {
    const { id } = useParams();
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    const handleDeleteButton = () => {
        deleteGenre(id);
    }

    if (isLoadingGenres) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5 className="card-title"><span className="text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-outline-danger m-2" onClick={handleDeleteButton} to="/mufajok">Igen</Link>
                <Link className="btn btn-outline-secondary m-2" to="/mufajok">Vissza</Link>
            </div>
        </div>
    )
}
