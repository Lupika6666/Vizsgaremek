import { Link, useParams } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useEffect } from "react";
import { EditAuthorForm } from "../../../features/authors/components/EditAuthorForm";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function EditAuthorPage(){
    const {id} = useParams();
    
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    if (isLoadingAuthors) {
        return (
            <div>
                <LoadingScreen/>
            </div>
        )
    }
    
    const author = authors.find(item=>item.id==id);

    return(
        <div>
            <EditAuthorForm author={author} updateAuthor={updateAuthor}/>
            <div  className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm" to="/szerzok" title="mégse"><i className="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}