import { useSearchParams } from "react-router";
import { AddLanguageForm } from "../../../features/languages/components/AddLanguageForm";
import { LanguageList } from "../../../features/languages/components/LanguageList";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { NavigationElement } from "../../../components/NavigationElement";
import { BreadcrumbElement } from "../../../components/BreadcrumbElement";

export function LanguageListPage() {
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    const [searchParams] = useSearchParams();

    const page = searchParams.has("oldal") ? Number(searchParams.get("oldal")) : 1;

    if (isLoadingLanguages) {
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
            <BreadcrumbElement routes={breadcrumbRoutes} activeText={"Nyelvek"}/>
            <LanguageList languages={languages} page={page} />
            <AddLanguageForm createLanguage={createLanguage} />
            <NavigationElement/>
        </div>
    )

}