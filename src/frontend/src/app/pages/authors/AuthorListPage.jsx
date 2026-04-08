import { useSearchParams } from "react-router";
import { AddAuthorForm } from "../../../features/authors/components/AddAuthorForm";
import { AuthorList } from "../../../features/authors/components/AuthorList";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function AuthorListPage() {
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    const [searchParams] = useSearchParams();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoadingAuthors) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }
    
    return (
        <div>
            <AuthorList authors={authors} page={page} />
            <AddAuthorForm createAuthor={createAuthor}/>
        </div>
    )

}