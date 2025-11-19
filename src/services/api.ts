import axios from "axios"; 
// Removemos importações de tipos problemáticas (AxiosRequestConfig, InternalAxiosRequestConfig)

const api = axios.create({
    baseURL: "http://192.168.0.10:3000",
});

// Usamos 'any' para garantir que o TypeScript pare de reclamar sobre tipos ausentes/desalinhados
api.interceptors.request.use((config: any) => {
    return config;
});

export default api;