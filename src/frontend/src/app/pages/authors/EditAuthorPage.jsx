import { useParams } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useEffect } from "react";
import { EditAuthorForm } from "../../../features/authors/components/EditAuthorForm";

export function EditAuthorPage(){
    const {id} = useParams();
    
    const { authors, selectedAuthor, isLoading: isLoadingAuthors, getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = useAuthors();

    const author = authors.find(item=>item.id==id);
    
    // useEffect(
    //     ()=>{
    //         getAuthorById(id);
    //     }, []
    // )

    return(
        <div>
            <EditAuthorForm author={author} updateAuthor={updateAuthor}/>
        </div>
    )
}