import { api } from "../../../lib/api"
import { Author } from "../models/Author";


export const authorApi = {
    getAll: async () => {
        const response = await api.get("/szerzok");
        const authors = response.data.adatok.map(item => Author.fromApi(item));
        return authors;
    },

    getById: async (id) => {
        const response = await api.get(`/szerzok/${id}`);
        const author = Author.fromApi(response.data.adatok[0]);
        return author;
    },

    create: async (authorName) => {
        const response = await api.post("/szerzok",
            {
                nev: authorName
            }
        )
        return response;
    },

    update: async (id, authorName) => {
        const response = await api.put(`/szerzok/${id}`,
            {
                nev: authorName
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/szerzok/${id}`)
        return response;
    }
}