import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

function DateSelect({ value, errorMessage, onChange }: Props) {
  const [date, setDate] = useState({
    date: 1,
    month: 0,
    year: 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target

    const newDate = {
      ...date,
      [name]: +value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='w-full truncate pl-5 pt-1 capitalize sm:w-[20%] sm:pl-0 sm:pt-3 sm:text-right'>Ngày sinh</div>
      <div className='w-full pl-5 sm:w-[80%]'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='date'
            value={date.date}
            onChange={handleChange}
          >
            <option value='' disabled>
              Ngày
            </option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='month'
            value={date.month}
            onChange={handleChange}
          >
            <option value='' disabled>
              Tháng
            </option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
            name='year'
            value={date.year}
            onChange={handleChange}
          >
            <option value='' disabled>
              Năm
            </option>
            {range(1990, 2024).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='ml-2 mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}

export default DateSelect
