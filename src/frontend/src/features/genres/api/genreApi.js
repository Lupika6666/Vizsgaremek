import { api } from "../../../lib/api"
import { Genre } from "../models/Genre";

export const genreApi = {
    getAll: async () => {
        const response = await api.get("/mufajok");
        const genres = response.data.map(item => Genre.fromApi(item));
        return genres;
    },

    getById: async (id) => {
        const response = await api.get(`/mufajok/${id}`);
        const genre = Genre.fromApi(response.data[0]);
        return genre;
    },

    create: async (genre) => await api.post("/mufajok",
        {
            nev: genre.nev
        }
    ),

    update: async (id, genre) => await api.put(`/mufajok/${id}`,
        {
            nev: genre.nev
        }
    ),

    delete: async (id) => await api.delete(`/mufajok/${id}`)
}