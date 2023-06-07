import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponseApi } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

function ChangePassword() {
  const {
    formState: { errors },
    register,
    setError,
    handleSubmit,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      reset()
      toast.success(res.data.message)
    } catch (error) {
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

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Mật khẩu cũ
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
                register={register}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Mật khẩu mới
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
                register={register}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Nhập lại mật khẩu
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'></div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Button
                type='submit'
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
