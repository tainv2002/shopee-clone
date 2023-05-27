import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (dotBefore === false) {
        dotBefore = true
        return (
          <span
            key={index}
            className='mx-1 flex w-10 cursor-pointer items-center justify-center rounded border border-transparent bg-white px-3 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }

      return null
    }

    const renderDotAfter = (index: number) => {
      if (dotAfter === false) {
        dotAfter = true
        return (
          <span
            key={index}
            className='mx-1 flex w-10 cursor-pointer items-center justify-center rounded border border-transparent bg-white px-3 py-2 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
          return renderDotAfter(index)
        }

        if (pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            key={index}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              'mx-1 flex w-10 cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <div className='mx-2 flex cursor-not-allowed items-center justify-center rounded bg-white/60 px-3 py-2 shadow-sm'>
          Prev
        </div>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 flex cursor-pointer items-center justify-center rounded bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}
      {renderPagination()}

      {page < pageSize ? (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 flex cursor-pointer items-center justify-center rounded bg-white px-3 py-2 shadow-sm'
        >
          Next
        </Link>
      ) : (
        <div className='mx-2 flex cursor-not-allowed items-center justify-center rounded bg-white/60 px-3 py-2 shadow-sm'>
          Next
        </div>
      )}
    </div>
  )
}

export default Pagination
