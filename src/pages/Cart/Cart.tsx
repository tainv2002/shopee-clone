import keyBy from 'lodash/keyBy'
import { produce } from 'immer'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import { Fragment, useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import path from 'src/constants/path'
import Button from 'src/components/Button'
import purchaseApi from 'src/apis/purchase.api'
import { AppContext } from 'src/contexts/app.context'
import { purchasesStatus } from 'src/constants/purchase'
import QuantityController from 'src/components/QuantityController'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noProduct from 'src/assets/images/no-product.png'

function Cart() {
  const queryClient = useQueryClient()
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      queryClient.invalidateQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasesInCart = purchaseInCartData?.data.data
  const isAllChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked === true),
    [extendedPurchases]
  )
  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked === true),
    [extendedPurchases]
  )
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchase = useMemo(
    () =>
      checkedPurchases.reduce(
        (result, current) => {
          const price = result.price + current.buy_count * current.product.price
          const discount =
            result.discount + current.buy_count * (current.product.price_before_discount - current.product.price)
          return { price, discount }
        },
        { price: 0, discount: 0 }
      ),
    [checkedPurchases]
  )

  useEffect(() => {
    if (purchasesInCart) {
      setExtendedPurchases((prev) => {
        const extendedPurchasesObject = keyBy(prev, '_id')

        return purchasesInCart.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        })
      })
    }
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckedAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases((prev) => prev.map((purchase) => ({ ...purchase, checked: event.target.checked })))
  }

  const handleQuantity = (purchaseIndex: number, value: number) => {
    const purchase = extendedPurchases[purchaseIndex]
    if (purchasesInCart && purchasesInCart[purchaseIndex].buy_count === value) return

    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].disabled = true
      })
    )

    updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseId: string) => {
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    if (purchaseIds.length > 0) deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchasesCount > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))

      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases && extendedPurchases.length > 0 ? (
          <Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-4 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6 bg-white'>
                    <div className='flex items-center'>
                      <div className='flex shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckedAll}
                        />
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
                  {extendedPurchases.map((purchase, index) => (
                    <div
                      key={purchase._id}
                      className='my-3 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500'
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orange'
                              checked={purchase.checked}
                              onChange={handleChecked(index)}
                            />
                          </div>
                          <div className='grow'>
                            <div className='flex items-center'>
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
                                  className='line-clamp-2 text-left'
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
                              classNameWrapper='ml-0'
                              max={purchase.product.quantity}
                              value={purchase.buy_count}
                              onIncrease={(value) => handleQuantity(index, value)}
                              onDecrease={(value) => handleQuantity(index, value)}
                              onType={handleTypeQuantity(index)}
                              onFocusOut={(value) => handleQuantity(index, value)}
                              disabled={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>đ{formatCurrency(purchase.price * purchase.buy_count)}</span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='bg-transparent text-black transition-colors hover:text-orange'
                              onClick={() => handleDelete(purchase._id)}
                            >
                              Xóa
                            </button>
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
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckedAll}
                  />
                </div>
                <button className='mx-3 border-none bg-transparent'>Chọn tất cả ({extendedPurchases.length})</button>
                <button className='mx-3 border-none bg-transparent' onClick={handleDeleteManyPurchases}>
                  Xóa
                </button>
              </div>
              <div className='mt-5 flex w-full flex-col items-start sm:ml-auto sm:mt-0 sm:items-end'>
                <div>
                  <div className='flex items-center justify-end'>
                    <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm)</div>
                    <div className='ml-2 text-2xl text-orange'>đ{formatCurrency(totalCheckedPurchase.price)}</div>
                  </div>
                  <div className='flex items-center justify-end text-sm'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6'>đ{formatCurrency(totalCheckedPurchase.discount)}</div>
                  </div>
                </div>

                <Button
                  className='mt-5 h-10 w-52 rounded bg-red-500 px-4 py-3 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  onClick={handleBuyPurchases}
                  disabled={buyProductsMutation.isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <div className='text-center'>
              <img src={noProduct} alt='no products' className='w-[100px] object-cover' />
            </div>
            <div className='mt-5 font-bold text-gray-500'>Giỏ hàng của bạn còn trống</div>
            <Link
              to={path.home}
              className='mt-5 bg-orange px-8 py-2 uppercase text-white transition-colors hover:bg-orange/80'
            >
              Mua ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
