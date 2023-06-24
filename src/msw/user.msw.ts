import { rest } from 'msw'
import { HttpStatusCode } from 'axios'
import { access_token_1s } from './auth.msw'

const baseUrl = import.meta.env.VITE_BASE_URL

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '646250281fa7d60338bfbab9',
    roles: ['User'],
    email: 'tainv@gmail.com',
    createdAt: '2023-05-15T15:30:48.251Z',
    updatedAt: '2023-06-07T15:37:18.146Z',
    date_of_birth: '2002-12-16T17:00:00.000Z',
    address: 'Thành phố Hồ Chí Minh',
    name: 'Nguyễn Văn Tài',
    phone: '123456890',
    avatar: '3b0e0344-c7a2-4ede-adb4-bfbcc3cae023.jpg'
  }
}

const meRequest = rest.get(`${baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')

  if (access_token === access_token_1s) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      })
    )
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [meRequest]
export default userRequests
