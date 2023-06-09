import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

function MainLayout() {
  console.log('main layout')

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default memo(MainLayout)
