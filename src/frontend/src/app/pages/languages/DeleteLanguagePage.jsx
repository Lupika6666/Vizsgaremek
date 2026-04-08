import { Link, useParams } from "react-router";
import { useLanguages } from "../../../features/languages/stores/languageProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function DeleteLanguagePage() {
    const { id } = useParams();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    const handleDeleteButton = () => {
        deleteLanguage(id);
    }

    if (isLoadingLanguages) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div className="card shadow text-center">
            <div className="card-body">
                <h5 className="card-title"><span className="text-danger">Biztos hogy törölni akarja?</span></h5>
                <Link className="btn btn-danger m-2" onClick={handleDeleteButton} to="/nyelvek">Igen</Link>
                <Link className="btn btn-secondary m-2" to="/nyelvek">Vissza</Link>
            </div>
        </div>
    )
}