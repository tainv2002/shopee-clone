import { screen } from '@testing-library/react'
import { delay, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

describe('Product Detail', () => {
  test('Render UI ProductDetail', async () => {
    renderWithRouter({ route: '/Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' })
    await delay(1000)
    expect(document.body).toMatchSnapshot()
    // screen.debug(document.body.querySelector('.bg-gray-200'))
  })
})
