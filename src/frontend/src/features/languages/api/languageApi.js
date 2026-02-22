import { api } from "../../../lib/api"
import { Language } from "../models/Language";


export const languageApi = {
    getAll: async () => {
        const response = await api.get("/nyelvek");
        const languages = response.data.map(item => Language.fromApi(item));
        return languages;
    },

    getById: async (id) => {
        const response = await api.get(`/nyelvek/${id}`);
        const language = Language.fromApi(response.data[0]);
        return language;
    },

    create: async (languageName) => await api.post("/nyelvek",
        {
            nev: languageName
        }
    ),

    update: async (id, languageName) => await api.put(`/nyelvek/${id}`,
        {
            nev: languageName
        }
    ),

    delete: async (id) => await api.delete(`/nyelvek/${id}`)
}