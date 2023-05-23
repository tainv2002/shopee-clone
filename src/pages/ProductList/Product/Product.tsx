import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
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
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>

          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-sm text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-2 max-w-[50%] truncate text-sm text-orange'>
              <span className='text-sm'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>

          <div className='mt-3 flex items-center justify-end'>
            {/* Stars list */}
            <ProductRating rating={product.rating} />

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
