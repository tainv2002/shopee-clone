import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'

describe('App', () => {
  test('App render and navigation', async () => {
    const { user } = renderWithRouter()

    /**
     * waitFor will execute the callback function many times
     * until the `timeout` is ended or `expect` is passed
     * The number of executed calls depend on the `timeout` and `interval`
     * Default: timeout = 1000ms and interval = 50ms
     */
    // Verify Home page
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    // Verify Login page navigation
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText(/Bạn chưa có tài khoản?/i)).toBeInTheDocument()
    })
  })

  // Test NotFound page
  test('NotFound page', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })

    await waitFor(() => {
      expect(screen.queryByText(/Page Not Found/i)).toBeInTheDocument()
    })
    // await logScreen(document.documentElement)
  })

  test('Render Register page', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
