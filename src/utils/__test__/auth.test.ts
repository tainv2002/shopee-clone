import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xMFQwNDoxMToxMS41NThaIiwiaWF0IjoxNjg2MzcwMjcxLCJleHAiOjE2ODYzNzAyNzZ9.D_12Q43mzitX48_qbcz1CbBMgySaZBJxIDEgoLT7O0A'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjI1MDI4MWZhN2Q2MDMzOGJmYmFiOSIsImVtYWlsIjoidGFpbnZAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0xMFQwNDoxMToxMS41NThaIiwiaWF0IjoxNjg2MzcwMjcxLCJleHAiOjE2ODYzNzM4NzF9.1OoQRqIbZa1ouweMMMrgcyCbGLMi5-lMoNlqNRsdynM'

const profile =
  '{"_id":"646250281fa7d60338bfbab9","roles":["User"],"email":"tainv@gmail.com","createdAt":"2023-05-15T15:30:48.251Z","updatedAt":"2023-06-07T15:37:18.146Z","__v":0,"date_of_birth":"2002-12-16T17:00:00.000Z","address":"Thành phố Hồ Chí Minh","name":"Nguyễn Văn Tài","phone":"123456890","avatar":"3b0e0344-c7a2-4ede-adb4-bfbcc3cae023.jpg"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token được lưu vào Local Storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được lưu vào Local Storage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('profile', () => {
  it('profile được lưu vào Local Storage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(getProfileFromLS()).toEqual(JSON.parse(profile))
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, refresh_token, profile trong LocalStorage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getProfileFromLS()).toEqual(null)
  })
})
