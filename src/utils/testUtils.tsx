import { render, screen, waitFor, waitForOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'

export const delay = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout)
  })

export const logScreen = async (body: HTMLElement = document.documentElement, options?: waitForOptions) => {
  const time = options?.timeout || 1000
  await waitFor(
    async () => {
      expect(await delay(time - 100)).toBe(true)
    },
    { ...options }
  )
  screen.debug(body, 99999999)
}

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return {
    ...render(<App />, { wrapper: BrowserRouter }),
    user: userEvent.setup()
  }
}
