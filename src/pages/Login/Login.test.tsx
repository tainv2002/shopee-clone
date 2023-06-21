import { beforeAll, describe, expect, it } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'

describe('Test Login page', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })

    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  it('Display required error when user did not fill out the form', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(/Email là bắt buộc/i)).toBeTruthy()
      expect(screen.queryByText(/Mật khẩu là bắt buộc/i)).toBeTruthy()
    })

    // await logScreen()
  })

  it('Display error when user typed wrong value', async () => {
    fireEvent.change(emailInput, {
      target: { value: 'test@mail' }
    })

    fireEvent.change(passwordInput, {
      target: { value: '123' }
    })

    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText(/Email không đúng định dạng/i)).toBeTruthy()
      expect(screen.queryByText(/Độ dài từ 5 - 160 ký tự/i)).toBeTruthy()
    })
  })

  it('Not display error when user typed true value', async () => {
    fireEvent.change(emailInput, {
      target: { value: 'tainv@gmail.com' }
    })

    fireEvent.change(passwordInput, {
      target: { value: '123123' }
    })

    // Những trường hợp chứng minh rằng tìm không ra text hay element
    // Thì nên dùng query hơn là find và get
    await waitFor(() => {
      expect(screen.queryByText(/Email không đúng định dạng/i)).toBeNull()
      expect(screen.queryByText(/Độ dài từ 5 - 160 ký tự/i)).toBeFalsy()
    })

    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    await logScreen()
  })
})
