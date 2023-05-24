import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldPath, RegisterOptions } from 'react-hook-form'

interface Props<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  name?: FieldPath<TFieldValues>
  register?: UseFormRegister<TFieldValues>
  rules?: RegisterOptions
}

function Input<TFieldValues extends FieldValues>({
  name,
  errorMessage,
  className,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600',
  register,
  rules,
  ...rest
}: Props<TFieldValues>) {
  const registerResult = register && name ? register(name, rules) : null

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
