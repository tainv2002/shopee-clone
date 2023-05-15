import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='mx-5 rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>

              <div className='mt-8'>
                <div className='mt-4'>
                  <input
                    type='email'
                    name='email'
                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Email'
                  />
                  <div className='ml-2 mt-1 min-h-[1rem] text-sm text-red-600'></div>
                </div>
                <div className='mt-4'>
                  <input
                    type='password'
                    name='password'
                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Password'
                    autoComplete='on'
                  />
                  <div className='ml-2 mt-1 min-h-[1rem] text-sm text-red-600'></div>
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    className='w-full rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>

              <div className='mt-8'>
                <div className='flex justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link to='/register' className='ml-1 text-red-400'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
