import { api } from "../../../lib/api"
import { Author } from "../models/Author";


export const authorApi = {
    getAll: async () => {
        const response = await api.get("/szerzok");
        const authors = response.data.map(item => Author.fromApi(item));
        return authors;
    },

    getById: async (id) => {
        const response = await api.get(`/szerzok/${id}`);
        const author = Author.fromApi(response.data[0]);
        return author;
    },

    create: async (authorName) => await api.post("/szerzok",
        {
            nev: authorName
        }
    ),

    update: async (id, authorName) => await api.put(`/szerzok/${id}`,
        {
            nev: authorName
        }
    ),

    delete: async (id) => await api.delete(`/szerzok/${id}`)
}