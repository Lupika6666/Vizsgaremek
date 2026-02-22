import { Link, useParams } from "react-router";
import { useLanguages } from "../../../features/languages/stores/languageProvider";

export function DeleteLanguagePage() {
    const { id } = useParams();
    const { languages, selectedLanguage, isLoading: isLoadingLanguages, getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = useLanguages();

    const handleDeleteButton = () => {
        deleteLanguage(id);
    }

    return (
        <div>
            <h3><span className="text-danger">Biztos hogy törölni akarja?</span></h3>
            <Link className="btn btn-danger" onClick={handleDeleteButton} to="/nyelvek">Igen</Link>
            <Link className="btn btn-secondary" to="/nyelvek">Vissza</Link>
        </div>
    )
}