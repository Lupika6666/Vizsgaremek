import { api } from "../../../lib/api"
import { BookCopy } from "../models/BookCopy";

export const bookCopyApi = {
    getAll: async () => {
        const response = await api.get("/peldanyok");
        const copies = response.data.adatok.map(item => BookCopy.fromApi(item));
        return copies;
    },

    getById: async (id) => {
        const response = await api.get(`/peldanyok/${id}`);
        const copy = BookCopy.fromApi(response.data.adatok[0]);
        return copy;
    },

    create: async (data) => {
        const response = await api.post("/peldanyok",
            {
                hely: data.hely,
                konyv_id: data.konyv_id
            }
        )
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/peldanyok/${id}`,
            {
                hely: data.hely,
                konyv_id: data.konyv_id
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/peldanyok/${id}`)
        return response;
    }
}