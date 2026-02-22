import { AddGenreForm } from "../../../features/genres/components/AddGenreForm";
import { GenreList } from "../../../features/genres/components/GenreList";
import { useGenres } from "../../../features/genres/stores/genreProvider";

export function GenreListPage() {
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    return (
        <div>
            <GenreList genres={genres} />
            <AddGenreForm createGenre={createGenre} />
        </div>
    )

}