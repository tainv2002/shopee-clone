import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { USerSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'

type FormData = Pick<USerSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

function Profile() {
  const { data: profileData } = useQuery({
    queryFn: userApi.getProfile,
    queryKey: ['profile']
  })

  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const {
    control,
    formState: { errors },
    register,
    setValue,
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1),
      name: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (profile) {
      console.log('profile', profile)

      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Email</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Tên</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
                register={register}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>
              Số điện thoại
            </div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Địa chỉ</div>
            <div className='w-full pl-5 sm:w-[80%]'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
                register={register}
              />
            </div>
          </div>

          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect value={field.value} onChange={field.onChange} errorMessage={errors.date_of_birth?.message} />
            )}
          />

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
            <button
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
