import { useQuery } from '@tanstack/react-query'

import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import productApi from 'src/apis/auth/product.api'
import useQueryParams from 'src/hooks/useQueryParams'

function ProductList() {
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryParams)
  })

  console.log(data)

  return (
    <div className='bg-gray py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='col-span-1'>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
