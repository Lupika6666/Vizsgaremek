import axios from "axios";
import { ACCESS_TOKEN_STORAGE_KEY } from "../config/constants";

export const api = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }
);

//token hozzáfűzése a kérések fejlécébe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

//új access token kérése
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //ha 401-es hibát kaptunk (access token lejárta) és még nem próbáltuk újra a kérést
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                //kérünk egy új access tokent
                const response = await axios.post("http://localhost:3000/api/felhasznalok/token-frissites", {},
                    { 
                        withCredentials: true 
                    }
                )

                const { accessToken } = response.data;
                //konzolra írás TESZTELÉSNÉL
                console.log(accessToken);

                //új access token mentése
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);

                // frissítjuk a kérés fejlécét
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                //eredeti kérés ismételt elküldése
                return api(originalRequest);
            }
            catch (refreshError) {
                // lejárt a refresh token is
                console.log(refreshError)
                // access token törlése local storage-ból
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)