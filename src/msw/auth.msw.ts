import { rest } from 'msw'
import { HttpStatusCode } from 'axios'
import { URL_LOGIN, URL_REFRESH_TOKEN } from 'src/apis/auth.api'

const baseUrl = import.meta.env.VITE_BASE_URL

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNVQxMjo0NDowOS45MjlaIiwiaWF0IjoxNjg2ODMzMDQ5LCJleHAiOjE2ODY4MzMwNTB9.o66T2BkQNa5xlHOEhXQ1P_myV7J2McX7F3K3c5ZkR6k'

export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNVQxMjo0Njo1My4wMTlaIiwiaWF0IjoxNjg2ODMzMjEzLCJleHAiOjE3NzMyMzMyMTN9.EjDNA7ovM1t5bOeNmZ74pUaZEi4vOD6GXaDFvF5-IpA'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0yMFQwOTowMjo0Ny44NjBaIiwiaWF0IjoxNjg3MjUxNzY3LCJleHAiOjE2ODgyNTE3NjZ9.a0G_4uS4_KN8tqMOK4QkqpNkrE_KXJ8tWjKpqgqbVfc',
    expires: 999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0yMFQwOTowMjo0Ny44NjBaIiwiaWF0IjoxNjg3MjUxNzY3LCJleHAiOjE2OTU4OTE3Njd9.3WZ6QjQmwHWtPxhb0aibQvra0aNCYxaJkPh8OZF9QOs',
    expires_refresh_token: 8640000,
    user: {
      _id: '646250281fa7d60338bfbab9',
      roles: ['User'],
      email: 'tainv@gmail.com',
      createdAt: '2023-05-15T15:30:48.251Z',
      updatedAt: '2023-06-07T15:37:18.146Z',
      __v: 0,
      date_of_birth: '2002-12-16T17:00:00.000Z',
      address: 'Thành phố Hồ Chí Minh',
      name: 'Nguyễn Văn Tài',
      phone: '123456890',
      avatar: '3b0e0344-c7a2-4ede-adb4-bfbcc3cae023.jpg'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0yMFQxNDoxMjo0OC45MTlaIiwiaWF0IjoxNjg3MjcwMzY4LCJleHAiOjE2ODc4NzUxNjh9.hqswkiOR7uqnuTnpaDw02x43j_kCJciYYrIHfBo8x60'
  }
}

const loginRequest = rest.post(`${baseUrl}${URL_LOGIN}`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshTokenRequest = rest.post(`${baseUrl}${URL_REFRESH_TOKEN}`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const authRequests = [loginRequest, refreshTokenRequest]
export default authRequests
