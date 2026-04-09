import { Link, useParams } from "react-router";
import { useGenres } from "../../../features/genres/stores/genreProvider";
import { useEffect } from "react";
import { EditGenreForm } from "../../../features/genres/components/EditGenreForm";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

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

    const genreById = genres.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/mufajok", text: "Műfajok"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditGenreForm genre={genreById} updateGenre={updateGenre} />
            <NavigationElement/>
        </div>
    )
}