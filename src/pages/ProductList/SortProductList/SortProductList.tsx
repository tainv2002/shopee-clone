import classNames from 'classnames'
import { sortBy, order as orderConstant } from 'src/constants/products'
import { QueryConfig } from '../ProductList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

function SortProductList({ pageSize, queryConfig }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: keyof typeof sortBy) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: keyof typeof sortBy) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            page: '1',
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: keyof typeof orderConstant) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            title='Giá'
            // className='h-8 bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100'
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            // onClick={() => handleSort(sortBy.price)}
            onChange={(e) => handlePriceOrder(e.target.value as keyof typeof orderConstant)}
          >
            <option value='' disabled className='bg-zinc-400 text-left text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-left text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-left text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>

          <div className='ml-4 flex items-center'>
            {/* Button prev page */}
            {page > 1 ? (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 cursor-pointer items-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow-sm hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            ) : (
              <span className='flex h-8 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow-sm hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            )}

            {/* Button next page */}
            {page < pageSize ? (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 cursor-pointer items-center rounded-br-sm rounded-tr-sm bg-white px-3 shadow-sm hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            ) : (
              <span className='flex h-8 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow-sm hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
