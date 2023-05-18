import axios, { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

const http = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const access_token = getAccessTokenFromLS()
    if (access_token && config.headers) {
      config.headers.authorization = access_token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    const url = response.config.url
    if (url === 'login' || url === 'register') {
      const access_token = (response.data as AuthResponse).data?.access_token
      saveAccessTokenToLS(access_token)
    } else if (url === 'logout') {
      clearAccessTokenFromLS()
    }
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message

      toast.error(message)
    }
    return Promise.reject(error)
  }
)

export default http
