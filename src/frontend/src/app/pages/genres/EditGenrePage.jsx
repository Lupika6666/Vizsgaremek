import { Link, useParams } from "react-router";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useEffect } from "react";
import { EditGenreForm } from "../../../features/genres/components/EditGenreForm";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function EditGenrePage() {
    const { id } = useParams();

    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    if (isLoadingGenres) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    const genre = genres.find(item => item.id == id);

    return (
        <div>
            <EditGenreForm genre={genre} updateGenre={updateGenre} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm" to="/mufajok" title="mégse"><i className="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}