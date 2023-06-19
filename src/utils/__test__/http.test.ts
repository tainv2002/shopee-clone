import { createHttpInstance } from '../http'
import { beforeEach, describe, expect, it } from 'vitest'
import { HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('http axios', () => {
  let http = createHttpInstance()
  beforeEach(() => {
    localStorage.clear()
    http = createHttpInstance()
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNVQxMjo0NDowOS45MjlaIiwiaWF0IjoxNjg2ODMzMDQ5LCJleHAiOjE2ODY4MzMwNTB9.o66T2BkQNa5xlHOEhXQ1P_myV7J2McX7F3K3c5ZkR6k'

  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xNVQxMjo0Njo1My4wMTlaIiwiaWF0IjoxNjg2ODMzMjEzLCJleHAiOjE3NzMyMzMyMTN9.EjDNA7ovM1t5bOeNmZ74pUaZEi4vOD6GXaDFvF5-IpA'

  // Should not use apis folder to make requests
  // Because we just test http file, we should only use http
  // If something in apis folder changes, it will not affect this test file
  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    // Should have an account and a server to test
    await http.post('login', {
      email: 'tainv@gmail.com',
      password: '123123'
    })
    const res = await http.get('me')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000days)
    const newHttp = createHttpInstance()
    const res = await newHttp.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
