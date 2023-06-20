import { createHttpInstance } from '../http'
import { beforeEach, describe, expect, it } from 'vitest'
import { HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
import { access_token_1s, refresh_token_1000days } from 'src/msw/auth.msw'

describe('http axios', () => {
  let http = createHttpInstance()
  beforeEach(() => {
    localStorage.clear()
    http = createHttpInstance()
  })

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
