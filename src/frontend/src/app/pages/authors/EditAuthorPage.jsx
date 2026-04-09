import { Link, useParams } from "react-router";
import { useAuthors } from "../../../features/authors/stores/authorProvider";
import { useEffect } from "react";
import { EditAuthorForm } from "../../../features/authors/components/EditAuthorForm";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

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
    
    const authorById = authors.find(item=>item.id==id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/szerzok", text: "Szerzők"}
    ];

    return(
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditAuthorForm author={authorById} updateAuthor={updateAuthor}/>
            <NavigationElement/>
        </div>
    )
}