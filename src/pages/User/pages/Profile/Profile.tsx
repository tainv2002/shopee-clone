import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import userImage from 'src/assets/images/user.svg'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile/InputFile'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

function Profile() {
  const { profile, setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryFn: userApi.getProfile,
    queryKey: ['profile']
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
    setError,
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      address: profile?.address || '',
      avatar: profile?.avatar || '',
      date_of_birth: profile?.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1),
      name: profile?.name || '',
      phone: profile?.phone || ''
    }
  })

  const avatar = watch('avatar')

  useEffect(() => {
    const _profile = profileData?.data.data
    if (_profile) {
      setProfile(_profile)
      setProfileToLS(_profile)
      setValue('name', _profile.name)
      setValue('phone', _profile.phone)
      setValue('address', _profile.address)
      setValue('avatar', _profile.avatar)
      setValue('date_of_birth', _profile.date_of_birth ? new Date(_profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profileData, setValue, setProfile])

  const handleChangeFile = (file: File) => {
    setFile(file)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(formData)
        const avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
        data.avatar = avatarName
      }

      const res = await updateProfileMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
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
                src={previewImage ? previewImage : (avatar && getAvatarUrl(avatar)) || userImage}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>

            <InputFile onFileChange={handleChangeFile} />

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
