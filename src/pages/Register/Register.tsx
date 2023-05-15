import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'

type FormData = Schema

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
    },
    () => {
      const password = getValues('password')
      console.log(password)
    }
  )

  // const password = watch('password')

  // console.log('password: ', password)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='mx-5 rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <Input
                  name='email'
                  type='email'
                  placeholder='Email'
                  className='mt-2'
                  errorMessage={errors.email?.message}
                  register={register}
                />

                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='mt-2'
                  autoComplete='on'
                  errorMessage={errors.password?.message}
                  register={register}
                />
                <Input
                  name='confirm_password'
                  type='password'
                  placeholder='Email'
                  className='mt-2'
                  autoComplete='on'
                  errorMessage={errors.confirm_password?.message}
                  register={register}
                />

                <div className='mt-4'>
                  <button
                    type='submit'
                    className='w-full rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600'
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
              <div className='mt-8'>
                <div className='flex justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link to='/login' className='ml-1 text-red-400'>
                    Đăng nhập
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

export default Register
