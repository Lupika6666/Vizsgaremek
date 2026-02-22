import { useParams } from "react-router";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useEffect } from "react";
import { EditGenreForm } from "../../../features/genres/components/EditGenreForm";

export function EditGenrePage() {
    const { id } = useParams();

    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    const genre = genres.find(item => item.id == id);

    // useEffect(
    //     ()=>{
    //         getGenreById(id);
    //     }, []
    // )

    return (
        <div>
            <EditGenreForm genre={genre} updateGenre={updateGenre} />
        </div>
    )
}