import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitForOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { AppProvider, getInitialAppContext } from 'src/contexts/app.context'

export const delay = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), timeout)
  })

export const logScreen = async (body: HTMLElement = document.documentElement, options?: waitForOptions) => {
  const time = options?.timeout || 1000
  await delay(time - 100)
  screen.debug(body, 99999999)
}

export const createQueryClientWrapper = () => {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
    }
  })

  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return Provider
}

const QueryClientWrapper = createQueryClientWrapper()

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  const defaultAppContextValue = getInitialAppContext()

  return {
    ...render(
      <QueryClientWrapper>
        <AppProvider defaultValue={defaultAppContextValue}>
          <App />
        </AppProvider>
      </QueryClientWrapper>,
      { wrapper: BrowserRouter }
    ),
    user: userEvent.setup()
  }
}
