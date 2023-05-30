import { InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, useController, FieldValues, Path } from 'react-hook-form'

export type InputV2Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputV2<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>(
  props: InputV2Props<TFieldValues, TName>
) {
  const {
    type,
    value,
    onChange,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600',
    ...rest
  } = props

  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: valueFromInput } = event.target
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật localValue state
      setLocalValue(valueFromInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(event)
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input {...field} {...rest} value={value || localValue} onChange={handleChange} className={classNameInput} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// type Gen<TFunc> = {
//   person: {
//     getName: TFunc
//   }
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleName: () => 'tai' = () => 'tai'

// function App() {
//   return <Hexa person={{ person: { getName: handleName } }} lastName='tai' />
// }
