import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import CartHeader from 'src/components/CartHeader'
import { memo } from 'react'

function CartLayout() {
  return (
    <div>
      <CartHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default memo(CartLayout)
