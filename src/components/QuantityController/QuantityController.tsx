import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

function QuantityController({
  value,
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  disabled,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    if (onType) onType(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    const _value = value ? Number(value) + 1 : localValue + 1
    if (max !== undefined && _value > max) {
      return
    }

    if (onIncrease) onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    const _value = value ? Number(value) - 1 : localValue - 1
    if (_value < 1) {
      return
    }

    if (onDecrease) onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(event.target.value)
    if (onFocusOut) onFocusOut(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      {/* Decrease button */}
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
        disabled={disabled}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>

      <InputNumber
        {...rest}
        value={value || localValue}
        className=''
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        classNameError='hidden'
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      />

      {/* Increase button */}
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
        disabled={disabled}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
