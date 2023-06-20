import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { HttpStatusCode } from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

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

export const restHandlers = [
  rest.post(`${baseUrl}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
