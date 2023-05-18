import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'

import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Schema

function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = _.omit(data, ['confirm_password'])

    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
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
      <div className='container'>
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='mx-5 rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <Input<FormData>
                  name='email'
                  type='email'
                  placeholder='Email'
                  className='mt-2'
                  errorMessage={errors.email?.message}
                  register={register}
                />

                <Input<FormData>
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='mt-2'
                  autoComplete='on'
                  errorMessage={errors.password?.message}
                  register={register}
                />

                <Input<FormData>
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm password'
                  className='mt-2'
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
