import { AddLanguageForm } from "../../../features/languages/components/AddLanguageForm";
import { LanguageList } from "../../../features/languages/components/LanguageList";
import { useLanguages } from "../../../features/languages/stores/languageProvider";

export function LanguageListPage() {
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    return (
        <div>
            <LanguageList languages={languages} />
            <AddLanguageForm createLanguage={createLanguage}/>
        </div>
    )

}