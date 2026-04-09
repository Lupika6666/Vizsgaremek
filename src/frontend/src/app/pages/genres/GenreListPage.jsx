import { useSearchParams } from "react-router";
import { AddGenreForm } from "../../../features/genres/components/AddGenreForm";
import { GenreList } from "../../../features/genres/components/GenreList";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { NavigationElement } from "../../../components/NavigationElement";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";

export function GenreListPage() {
    const { genres, selectedGenre, isLoading: isLoadingGenres, getGenres, getGenreById, createGenre, updateGenre, deleteGenre } = useGenres();

    const [searchParams] = useSearchParams();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoadingGenres) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Műfajok"}/>
            <GenreList genres={genres} page={page} />
            <AddGenreForm createGenre={createGenre} />
            <NavigationElement/>
        </div>
    )

}