import { api } from "../../../lib/api"

export const userApi = {
    login: async (email, password) => {
        const response = await api.post("/userek/bejelentkezes",
            {
                email: email,
                jelszo: password
            }
        )
        return response.data;
    },

    register: async (email, password, name, readerId) => {
        const response = await api.post("/userek/regisztracio",
            {
                email: email,
                jelszo: password,
                nev: name,
                olvaso_id: readerId
            }
        )
        return response.data;
    }
}
