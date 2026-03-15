import { api } from "../../../lib/api"
import { Book } from "../models/Book";

export const bookApi = {
    getAll: async () => {
        const response = await api.get("/konyvek");
        const books = response.data.adatok.map(item => Book.fromApi(item));
        return books;
    },

    getById: async (id) => {
        const response = await api.get(`/konyvek/${id}`);
        const book = Book.fromApi(response.data.adatok[0]);
        return book;
    },

    create: async (book) => {
        const response = await api.post("/konyvek",
            {
                cim: book.cim,
                isbn: book.isbn,
                publikalas_ev: book.publikalas_ev,
                leiras: book.leiras,
                nyelv_id: book.nyelv_id,
                szerzo_id: book.szerzo_id,
                mufaj_id: book.mufaj_id
            }
        )
        return response;
    },

    update: async (id, book) => {
        const response = await api.put(`/konyvek/${id}`,
            {
                cim: book.cim,
                isbn: book.isbn,
                publikalas_ev: book.publikalas_ev,
                leiras: book.leiras,
                nyelv_id: book.nyelv_id,
                szerzo_id: book.szerzo_id,
                mufaj_id: book.mufaj_id
            }
        )
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/konyvek/${id}`)
        return response;
    }

}