import { api } from "../../../lib/api"
import { Borrowing } from "../models/Borrowing";

export const borrowingApi = {
    getAll: async()=>{
        const response = await api.get("/kolcsonzesek");
        const borrowings = response.data.map(item=>Borrowing.fromApi(item));
        return borrowings;
    },

    getById: async(id)=>{
        const response = await api.get(`/kolcsonzesek/${id}`);
        const borrowing = Borrowing.fromApi(response.data[0]);
        return borrowing;
    },

    create: async(data)=>await api.post("/kolcsonzesek", 
        {
            kolcsonzes_ideje: data.kolcsonzes_ideje,
            hatarido: data.hatarido,
            peldany_id: data.peldany_id,
            olvaso_id: data.olvaso_id
        }
    ),

    update: async(id, data)=>await api.put(`/kolcsonzesek/${id}`, 
        {
            kolcsonzes_ideje: data.kolcsonzes_ideje,
            hatarido: data.hatarido,
            peldany_id: data.peldany_id,
            olvaso_id: data.olvaso_id
        }
    ),

    delete: async(id)=>await api.delete(`/kolcsonzesek/${id}`)
}