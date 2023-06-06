import { Fragment, InputHTMLAttributes, useRef } from 'react'

import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file: File) => void
}

function InputFile({ onFileChange, ...rest }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]

    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image/'))) {
      toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
      return
    }

    onFileChange && onFileChange(fileFromLocal as File)
  }

  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(event.target as any).value = ''
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <input
        {...rest}
        ref={fileInputRef}
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={onChange}
        onClick={onInputClick}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}

export default InputFile
