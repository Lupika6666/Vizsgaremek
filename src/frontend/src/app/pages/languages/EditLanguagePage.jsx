import { useParams } from "react-router";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { useEffect } from "react";
import { EditLanguageForm } from "../../../features/languages/components/EditLanguageForm";

export function EditLanguagePage(){
    const {id} = useParams();
    
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    const language = languages.find(item=>item.id==id);
    
    // useEffect(
    //     ()=>{
    //         getLanguageById(id);
    //     }, []
    // )

    return(
        <div>
            <EditLanguageForm language={language} updateLanguage={updateLanguage}/>
        </div>
    )
}