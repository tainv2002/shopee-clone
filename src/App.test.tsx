import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import { logScreen } from './utils/testUtils'

expect.extend(matchers)

describe('App', () => {
  test('App render and navigation', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()

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
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })

  // Test NotFound page
  test('NotFound page', async () => {
    const badRoute = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await logScreen(document.documentElement)
  })
})
