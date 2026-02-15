import { api } from "../../../lib/api"
import { Book } from "../models/Book";

export const bookApi = {
    getAll: async () => {
        const response = await api.get("/konyvek");
        const books = response.data.map(item => Book.fromApi(item));
        return books;
    },

    getById: async (id) => {
        const response = await api.get(`/konyvek/${id}`);
        const book = Book.fromApi(response.data[0]);
        return book;
    },

    create: async (book) => await api.post("/konyvek",
        {
            cim: book.cim,
            isbn: book.isbn,
            publikalas_ev: book.publikalas_ev,
            leiras: book.leiras,
            nyelv_id: book.nyelv_id,
            szerzo_id: book.szerzo_id,
            mufaj_id: book.mufaj_id
        }
    ),

    update: async (id, book) => await api.put(`/konyvek/${id}`,
        {
            cim: book.cim,
            isbn: book.isbn,
            publikalas_ev: book.publikalas_ev,
            leiras: book.leiras,
            nyelv_id: book.nyelv_id,
            szerzo_id: book.szerzo_id,
            mufaj_id: book.mufaj_id
        }
    ),

    delete: async (id) => await api.delete(`/konyvek/${id}`)

}