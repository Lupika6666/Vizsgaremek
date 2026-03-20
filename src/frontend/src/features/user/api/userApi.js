import { api } from "../../../lib/api"

export const userApi = {
    login: async (email, password) => {
        const response = await api.post("/felhasznalok/bejelentkezes",
            {
                email: email,
                jelszo: password
            }
        )
        return response.data;
    },

    logout: async () => {
        //ezzel a hívással fog törlődni a refreshToken a sütik közül
        const response = await api.post("felhasznalok/kijelentkezes");
        return response.data;
    },

    register: async (email, password, name, readerId) => {
        const response = await api.post("/felhasznalok/regisztracio",
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
