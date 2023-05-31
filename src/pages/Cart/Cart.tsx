import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'

function Cart() {
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchasesList({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchaseInCartData?.data.data

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center'>
                  <div className='flex shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' />
                  </div>

                  <div className='grow text-black'>Sản phẩm</div>
                </div>
              </div>

              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>

            {/* Purchases list */}
            <div className='rounded-sm bg-white'>
              {purchasesInCart?.map((purchase) => (
                <div
                  key={purchase._id}
                  className='my-3 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-orange' />
                      </div>
                      <div className='grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 shrink-0'
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>

                          <div className='grow px-2 pb-2 pt-1'>
                            <Link
                              className='line-clamp-2'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            đ{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>đ{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='ml-0'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>đ{formatCurrency(purchase.price * purchase.buy_count)}</span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-transparent text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='sticky bottom-0 z-10 mt-8 flex flex-col items-start rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:justify-center'>
          <div className='flex items-center'>
            <div className='flex shrink-0 items-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-orange' />
            </div>
            <button className='mx-3 border-none bg-transparent'>Chọn tất cả</button>
            <button className='mx-3 border-none bg-transparent'>Xóa</button>
          </div>
          <div className='mt-5 flex w-full flex-col items-start sm:ml-auto sm:mt-0'>
            <div>
              <div className='flex items-center justify-end'>
                <div>Tổng thanh toán (0 sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'>đ{formatCurrency(138000)}</div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6'>đ{formatCurrency(138000)}</div>
              </div>
            </div>

            <Button className='mt-5 h-10 w-52 rounded bg-red-500 px-4 py-3 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
