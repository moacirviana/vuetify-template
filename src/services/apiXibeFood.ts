import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
//import { useAuthStore } from '@/stores/auth'
//import type { ApiResponse } from '@/types'

const apiElo: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de requisição: adiciona token
/*
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
}) */

// Interceptor de resposta: extrai data do wrapper padrão
/*
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    const { success, message, data, errors } = response.data
    
    if (!success) {
      return Promise.reject(new Error(message || 'Erro na requisição'))
    }
    
    return data // Retorna apenas o conteúdo de "data"
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
*/

export default apiElo;
