import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2

function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (dotBefore === false) {
        dotBefore = true
        return (
          <button
            key={index}
            className='mx-1 flex w-10 cursor-pointer items-center justify-center rounded border border-transparent bg-white px-3 py-2 shadow-sm'
          >
            ...
          </button>
        )
      }

      return null
    }

    const renderDotAfter = (index: number) => {
      if (dotAfter === false) {
        dotAfter = true
        return (
          <button
            key={index}
            className='mx-1 flex w-10 cursor-pointer items-center justify-center rounded border border-transparent bg-white px-3 py-2 shadow-sm'
          >
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
        //   if (dotAfter === false) {
        //     dotAfter = true
        //     return (
        //       <button
        //         key={index}
        //         className='mx-1 flex w-10 cursor-pointer items-center justify-center rounded border border-transparent bg-white px-3 py-2 shadow-sm'
        //       >
        //         ...
        //       </button>
        //     )
        //   }
        //   return null
        // }

        if (pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
          return renderDotAfter(index)
        }

        if (pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }

        return (
          <button
            key={index}
            className={classNames(
              'mx-1 flex w-10 cursor-pointer items-center justify-center rounded border bg-white px-3 py-2 shadow-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 flex cursor-pointer items-center justify-center rounded bg-white px-3 py-2 shadow-sm'>
        Prev
      </button>
      {renderPagination()}
      <button className='mx-2 flex cursor-pointer items-center justify-center rounded bg-white px-3 py-2 shadow-sm'>
        Next
      </button>
    </div>
  )
}

export default Pagination
