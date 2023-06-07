import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppContext } from './contexts/app.context'
import path from './constants/path'
import CartLayout from './layouts/CartLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import UserLayout from './pages/User/layouts/UserLayout'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Cart = lazy(() => import('./pages/Cart'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetail />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.user,
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <HistoryPurchase />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: '',
          element: <CartLayout />,
          children: [
            {
              path: path.cart,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <MainLayout />,
      children: [
        {
          path: '*',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          )
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
