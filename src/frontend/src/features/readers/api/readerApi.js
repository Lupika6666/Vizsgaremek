import { api } from "../../../lib/api"
import { Reader } from "../models/Reader";

export const readerApi = {
    getAll: async () => {
        const response = await api.get("/olvasok");
        const readers = response.data.adatok.map(item => Reader.fromApi(item));
        return readers;
    },

    getById: async (id) => {
        const response = await api.get(`/olvasok/${id}`);
        const reader = Reader.fromApi(response.data.adatok[0]);
        return reader;
    },

    create: async (data) => {
        const response = await api.post("/olvasok",
            {
                kartyaszam: data.kartyaszam,
                nev: data.nev,
                email: data.email,
                tel: data.tel
            }
        )
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/olvasok/${id}`,
            {
                nev: data.nev,
                email: data.email,
                tel: data.tel
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/olvasok/${id}`)
        return response;
    }
}