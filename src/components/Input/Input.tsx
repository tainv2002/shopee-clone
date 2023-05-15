import { UseFormRegister } from 'react-hook-form'
import { Schema } from 'src/utils/rules'

type FormInputs = Schema

interface Props {
  name: keyof FormInputs
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  errorMessage?: string
  className?: string
  register: UseFormRegister<FormInputs>
}

function Input({ type, placeholder, name, autoComplete, errorMessage, className, register }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}

export default Input
