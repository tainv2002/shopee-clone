import { Link } from 'react-router-dom'
import path from 'src/constants/path'

function UserSideNav() {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src='https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/332294296_872079104071978_8443506191486236265_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tc7Sexyl5bYAX9by_CZ&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfAC4gOwsXvV96kvIBRSdZBr2MSczl7dbXgL21vvPbFO3A&oe=64814F9D'
            alt='avatar'
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>taijustin</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' className='mr-1'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              ></path>
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-7 flex flex-col gap-2'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[18px] w-[18px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Tài khoản của tôi
        </Link>

        <Link to={path.changePassword} className='flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 h-[18px] w-[18px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Đơn mua
        </Link>

        <Link to={path.historyPurchase} className='flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 h-[18px] w-[18px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  )
}

export default UserSideNav
