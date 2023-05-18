import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

import Input from 'src/components/Input'
import { loginAccount } from 'src/apis/auth/auth.api'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='mx-5 rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>

              <div className='mt-8'>
                <Input<FormData>
                  name='email'
                  type='email'
                  placeholder='Email'
                  autoComplete='on'
                  className='mt-2'
                  errorMessage={errors.email?.message}
                  register={register}
                />

                <Input<FormData>
                  name='password'
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  register={register}
                />
              </div>

              <div className='mt-4'>
                <Button
                  type='submit'
                  className='w-full rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Đăng nhập
                </Button>
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
