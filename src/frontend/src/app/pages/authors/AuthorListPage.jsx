import { AddAuthorForm } from "../../../features/authors/components/AddAuthorForm";
import { AuthorList } from "../../../features/authors/components/AuthorList";
import { useAuthors } from "../../../features/authors/stores/authorProvider";

export function AuthorListPage() {
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    return (
        <div>
            <AuthorList authors={authors} />
            <AddAuthorForm createAuthor={createAuthor}/>
        </div>
    )

}