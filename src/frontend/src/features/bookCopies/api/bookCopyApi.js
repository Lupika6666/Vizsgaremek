import { api } from "../../../lib/api"
import { BookCopy } from "../models/BookCopy";

export const bookCopyApi = {
    getAll: async () => {
        const response = await api.get("/peldanyok");
        const copies = response.data.map(item => BookCopy.fromApi(item));
        return copies;
    },

    getById: async (id) => {
        const response = await api.get(`/peldanyok/${id}`);
        const copy = BookCopy.fromApi(response.data[0]);
        return copy;
    },

    create: async (data) => await api.post("/peldanyok",
        {
            hely: data.hely,
            konyv_id: data.konyv_id
        }
    ),

    update: async (id, data) => await api.put(`/peldanyok/${id}`,
        {
            hely: data.hely,
            konyv_id: data.konyv_id
        }
    ),

    delete: async (id) => await api.delete(`/peldanyok/${id}`)
}