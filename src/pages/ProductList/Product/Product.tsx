import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  return (
    <Link to='/' className=''>
      <div className='duratop-100 rounded-sm bg-white shadow transition-transform hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            className='absolute left-0 top-0 h-full  w-full bg-white object-cover'
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>

          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-sm text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-2 max-w-[50%] truncate text-sm text-orange'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>

          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute left-0 top-0 h-full w-[50%] overflow-hidden'>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='h-3 w-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='h-3 w-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                  ></polygon>
                </svg>
              </div>
            </div>

            <div className='ml-2 text-xs'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
