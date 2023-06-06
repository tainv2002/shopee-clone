import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Popover from '../Popover'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import userImage from 'src/assets/images/user.svg'
import { getAvatarUrl } from 'src/utils/utils'

function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex items-center justify-end gap-4'>
      <Popover
        as='span'
        className='flex cursor-pointer items-center gap-0.5 py-1 text-sm text-white hover:text-gray-300'
        renderPopover={
          <div className='w-44 rounded-sm bg-white shadow-md'>
            <div className='flex flex-col'>
              <button type='button' className='block px-2 py-3 text-left text-sm text-black hover:text-orange'>
                Tiếng Việt
              </button>
              <button type='button' className='block px-2 py-3 text-left text-sm text-black hover:text-orange'>
                Tiếng Anh
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <div>Tiếng Việt</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='flex cursor-pointer items-center gap-0.5 py-1 text-sm text-white hover:text-gray-300'
          renderPopover={
            <div className='w-40 rounded-sm bg-white shadow-md'>
              <div className='flex flex-col'>
                <Link
                  to={path.profile}
                  className='block px-2 py-3 text-left text-sm text-black hover:bg-gray-100 hover:text-cyan-300'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='block px-2 py-3 text-left text-sm text-black hover:bg-gray-100 hover:text-cyan-300'
                >
                  Đơn mua
                </Link>
                <button
                  type='button'
                  className='block px-2 py-3 text-left text-sm text-black hover:bg-gray-100 hover:text-cyan-300'
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          }
        >
          <div className='h-5 w-5 flex-shrink-0'>
            <img
              className='h-full w-full rounded-full object-cover text-white'
              src={profile?.avatar ? getAvatarUrl(profile.avatar) : userImage}
              alt=''
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <>
          <Link
            to={path.register}
            className='flex cursor-pointer items-center gap-0.5 py-1 text-sm text-white hover:text-gray-300'
          >
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link
            to={path.login}
            className='flex cursor-pointer items-center gap-0.5 py-1 text-sm text-white hover:text-gray-300'
          >
            Đăng nhập
          </Link>
        </>
      )}
    </div>
  )
}

export default NavHeader
