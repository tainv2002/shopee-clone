import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<TFieldValues>
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: string
  errorMessage?: string
  className?: string
  register: UseFormRegister<TFieldValues>
}

function Input<TFieldValues extends FieldValues>({
  type,
  placeholder,
  name,
  autoComplete,
  errorMessage,
  className,
  register,
  ...rest
}: Props<TFieldValues>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
        {...rest}
      />
      <div className='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}

export default Input
