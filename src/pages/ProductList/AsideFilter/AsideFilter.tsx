import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

import path from 'src/constants/path'
import Button from 'src/components/Button'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import InputNumber from 'src/components/InputNumber'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import { omit } from 'lodash'

interface Props {
  categories: Category[] | []
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

function AsideFilter({ categories = [], queryConfig }: Props) {
  const { category } = queryConfig

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit(
    (data) => {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          page: '1',
          price_max: data.price_max,
          price_min: data.price_min
        }).toString()
      })
    },
    (err) => {
      if (err.price_max?.ref?.focus) {
        err.price_max?.ref?.focus()
      }
    }
  )

  const handleRemoveAll = () => {
    setValue('price_max', '')
    setValue('price_min', '')
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({ ...queryConfig }, ['price_min', 'price_max', 'rating_filter', 'category'])
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>

      <div className='my-4 h-[1px] bg-gray-200' />

      {/* Categories list */}
      {categories && (
        <ul>
          {categories.map((categoryItem) => (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: '1',
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative block px-2 text-sm', {
                  'font-semibold text-orange': category === categoryItem._id,
                  'text-black': category !== categoryItem._id
                })}
              >
                {categoryItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>

      <div className='my-4 h-[1px] bg-gray-200' />

      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ TỪ'
                    classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm text-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-3.5 h-[1px] w-3 shrink-0 bg-gray-600'></div>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ ĐẾN'
                    classNameInput='w-full rouned-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm text-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>

          <div className='mt-1 min-h-[1.25rem] text-center text-xs text-red-600'>{errors.price_min?.message}</div>

          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>

      <div className='my-4 h-[1px] bg-gray-200' />

      <div className='text-sm'>Đánh giá</div>

      {/* Rating Stars */}
      <RatingStars queryConfig={queryConfig} />

      <div className='my-4 h-[1px] bg-gray-200' />

      <Button
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
