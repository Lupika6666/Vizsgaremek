import { Link, useParams } from "react-router";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { useEffect } from "react";
import { EditLanguageForm } from "../../../features/languages/components/EditLanguageForm";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";
import { NavigationElement } from "../../../components/NavigationElement";

export function EditLanguagePage() {
    const { id } = useParams();

    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    if (isLoadingLanguages) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    const languageById = languages.find(item => item.id == id);

    const breadcrumbRoutes = [
        {link: "/", text: "Kezdőlap"},
        {link: "/nyelvek", text: "Nyelvek"}
    ];

    return (
        <div>
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Szerkesztés"}/>
            <EditLanguageForm language={languageById} updateLanguage={updateLanguage} />
            <NavigationElement/>
        </div>
    )
}