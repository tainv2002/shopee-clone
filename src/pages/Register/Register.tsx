import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản cho dự án Shopee Clone' />
      </Helmet>
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
                  classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'
                  errorMessage={errors.email?.message}
                  register={register}
                />

                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='mt-2'
                  classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'
                  autoComplete='on'
                  errorMessage={errors.password?.message}
                  register={register}
                />

                <Input
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm password'
                  className='mt-2'
                  classNameInput='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'
                  autoComplete='on'
                  errorMessage={errors.confirm_password?.message}
                  register={register}
                />
              </div>

              <div className='mt-4'>
                <Button
                  type='submit'
                  className='w-full rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8'>
                <div className='flex justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link to={path.login} className='ml-1 text-red-400'>
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
