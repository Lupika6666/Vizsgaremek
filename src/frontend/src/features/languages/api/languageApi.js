import { api } from "../../../lib/api"
import { Language } from "../models/Language";


export const languageApi = {
    getAll: async () => {
        const response = await api.get("/nyelvek");
        const languages = response.data.adatok.map(item => Language.fromApi(item));
        return languages;
    },

    getById: async (id) => {
        const response = await api.get(`/nyelvek/${id}`);
        const language = Language.fromApi(response.data.adatok[0]);
        return language;
    },

    create: async (languageName) => {
        const response = await api.post("/nyelvek",
            {
                nev: languageName
            }
        )
        return response;
    },

    update: async (id, languageName) => {
        const response = await api.put(`/nyelvek/${id}`,
            {
                nev: languageName
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/nyelvek/${id}`)
        return response;
    }
}