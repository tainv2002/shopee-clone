import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileToLS
} from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseApi } from 'src/types/utils.type'

export function createHttpInstance() {
  let access_token = getAccessTokenFromLS()
  let refresh_token = getRefreshTokenFromLS()
  let profile = getProfileFromLS()
  let refreshTokenRequest: Promise<string> | null = null // Biến này để làm cờ tránh gọi refresh token request nhiều lần 1 lúc

  const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'expire-access-token': 5, // 10s
      'expire-refresh-token': 60 * 60 // 1h
    }
  })

  // Add a request interceptor
  http.interceptors.request.use(
    function (config) {
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
      if (url === URL_LOGIN || url === URL_REGISTER) {
        const data = response.data as AuthResponse
        access_token = data.data?.access_token
        refresh_token = data.data?.refresh_token
        profile = data.data?.user
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        setProfileToLS(profile)
      } else if (url === URL_LOGOUT) {
        access_token = ''
        refresh_token = ''
        profile = null
        clearLS()
      }
      return response
    },
    function (error: AxiosError) {
      // Chỉ toast lỗi không phải 422 và 401
      if (
        error.response?.status &&
        ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data?.message || error.message
        toast.error(message)
      }

      // Lỗi Unauthorized 401 có rất nhiều trường hợp
      // - Token không đúng
      // - Không truyền token
      // - Token hết hạn

      // Nếu là lỗi 401
      if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        const { url } = config
        // Trường hợp Token hết hạn và request đó không phải là của request refresh token
        // thì chúng ta mới tiến hành gọi refresh token
        if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
          // Hạn chế gọi 2 lần handleRefreshToken
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : handleRefreshToken().finally(() => {
                // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                setTimeout(() => {
                  refreshTokenRequest = null
                }, 10000)
              })

          return refreshTokenRequest.then(() => {
            // Tiếp tục gọi lại request cũ vừa bị lỗi
            return http(config)
          })
        }

        // Còn những trường hợp token không đúng
        // không truyền token
        // token hết hạn
        // nhưng gọi refresh token fail
        // thì tiến hành xóa local storage và toast message
        clearLS()
        access_token = ''
        refresh_token = ''
        profile = null
        toast.error(error.response?.data.data?.message || error.response?.data.message)
      }

      return Promise.reject(error)
    }
  )

  const handleRefreshToken = () => {
    return http
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token
      })
      .then((res) => {
        access_token = res.data.data.access_token
        setAccessTokenToLS(access_token)
        return access_token
      })
      .catch((err) => {
        clearLS()
        access_token = ''
        refresh_token = ''
        throw err
      })
  }

  return http
}

export default createHttpInstance()
