import { api } from "../../../lib/api"
import { Reader } from "../models/Reader";

export const readerApi = {
    getAll: async () => {
        const response = await api.get("/olvasok");
        const readers = response.data.map(item => Reader.fromApi(item));
        return readers;
    },

    getById: async (id) => {
        const response = await api.get(`/olvasok/${id}`);
        const reader = Reader.fromApi(response.data[0]);
        return reader;
    },

    create: async (data) => await api.post("/olvasok",
        {
            kartyaszam: data.kartyaszam,
            nev: data.nev,
            email: data.email,
            tel: data.tel
        }
    ),

    update: async (id, data) => await api.put(`/olvasok/${id}`,
        {
            nev: data.nev,
            email: data.email,
            tel: data.tel
        }
    ),

    delete: async (id) => await api.delete(`/olvasok/${id}`)
}