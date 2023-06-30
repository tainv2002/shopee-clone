import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav/UserSideNav'
import { memo } from 'react'

function UserLayout() {
  return (
    <div className='bg-neutral-100 py-6 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-16 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(UserLayout)
