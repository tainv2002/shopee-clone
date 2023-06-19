import { screen, waitFor, waitForOptions } from '@testing-library/react'
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
