import Input from 'src/components/Input'

function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Email</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <div className='pt-3 text-gray-700'>ta*********@gmail.com</div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Tên</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Số điện thoại
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Địa chỉ</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Ngày sinh
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3' defaultValue=''>
                  <option value='' disabled>
                    Ngày
                  </option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3' defaultValue=''>
                  <option value='' disabled>
                    Tháng
                  </option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3' defaultValue=''>
                  <option value='' disabled>
                    Năm
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/332294296_872079104071978_8443506191486236265_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tc7Sexyl5bYAX9by_CZ&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfAC4gOwsXvV96kvIBRSdZBr2MSczl7dbXgL21vvPbFO3A&oe=64814F9D'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>

            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
