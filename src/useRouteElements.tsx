import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'

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
          element: <ProductList />
        },
        {
          path: path.productDetail,
          element: <ProductDetail />
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
          children: [{ path: path.profile, element: <Profile /> }]
        },
        {
          path: '',
          element: <CartLayout />,
          children: [{ path: path.cart, element: <Cart /> }]
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
            { path: path.login, element: <Login /> },
            { path: path.register, element: <Register /> }
          ]
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
