import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import useRouteElements from './useRouteElements'
import ErrorBoundary from './components/ErrorBoundary'
import { LocalStorageEventTarget } from './utils/auth'
import { AppProvider, AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <AppProvider>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer />
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
