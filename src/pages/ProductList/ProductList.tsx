import { useQuery } from '@tanstack/react-query'

import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories
  })

  return (
    <div className='bg-gray-100 py-6'>
      <div className='container'>
        {!isLoadingProducts && !isLoadingCategories && productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}

        {(isLoadingProducts || isLoadingCategories) && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {/* <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} /> */}

              <div role='status' className='flex max-w-md animate-pulse flex-col gap-4 space-y-4 rounded p-4 md:p-6'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='flex items-center justify-between'>
                      <div>
                        <div className='mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600'></div>
                        <div className='h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                      </div>
                      <div className='h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700'></div>
                    </div>
                  ))}
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
            <div className='col-span-9'>
              {/* <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} /> */}
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {/* {productsData.data.data.products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))} */}

                {Array(20)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      role='status'
                      className='max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6'
                    >
                      <div className='mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700'>
                        <svg
                          className='h-12 w-12 text-gray-200 dark:text-gray-600'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 640 512'
                        >
                          <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                        </svg>
                      </div>
                      <div className='mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'></div>
                      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                      <div className='mt-4 flex items-center space-x-3'>
                        <svg
                          className='h-14 w-14 text-gray-200 dark:text-gray-700'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                        <div>
                          <div className='mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'></div>
                          <div className='h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700'></div>
                        </div>
                      </div>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
