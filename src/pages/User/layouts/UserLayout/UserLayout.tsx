import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav/UserSideNav'

function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}

export default UserLayout
