import { Link, useParams } from "react-router";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { useEffect } from "react";
import { EditLanguageForm } from "../../../features/languages/components/EditLanguageForm";
import { LoadingScreen } from "../../../components/LoadingScreen";

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

    const language = languages.find(item => item.id == id);

    return (
        <div>
            <EditLanguageForm language={language} updateLanguage={updateLanguage} />
            <div className="card shadow p-3">
                <div>
                    <Link className="btn btn-outline-secondary btn-sm" to="/nyelvek" title="mégse"><i className="bi bi-arrow-left"></i></Link>
                </div>
            </div>
        </div>
    )
}