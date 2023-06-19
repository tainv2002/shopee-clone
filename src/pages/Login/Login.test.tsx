import { describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'

expect.extend(matchers)

describe('Test Login page', () => {
  it('Display required error when user did not fill out the form', async () => {
    const { user } = renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })

    const submitButton = document.querySelector('form button[type="submit"]') as Element
    user.click(submitButton)

    expect(await screen.findByText(/Email là bắt buộc/i)).toBeTruthy()
    expect(await screen.findByText(/Mật khẩu là bắt buộc/i)).toBeTruthy()

    await logScreen()
  })
})
