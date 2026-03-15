import { api } from "../../../lib/api"
import { Genre } from "../models/Genre";

export const genreApi = {
    getAll: async () => {
        const response = await api.get("/mufajok");
        const genres = response.data.adatok.map(item => Genre.fromApi(item));
        return genres;
    },

    getById: async (id) => {
        const response = await api.get(`/mufajok/${id}`);
        const genre = Genre.fromApi(response.data.adatok[0]);
        return genre;
    },

    create: async (genreName) => {
        const response = await api.post("/mufajok",
            {
                nev: genreName
            }
        )
        return response;
    },

    update: async (id, genreName) => {
        const response = await api.put(`/mufajok/${id}`,
            {
                nev: genreName
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/mufajok/${id}`)
        return response;
    }
}