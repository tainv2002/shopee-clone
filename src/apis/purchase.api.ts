import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponseApi<Purchase[]>>(URL, {
      params
    })
  },
  buyProducts: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponseApi<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchases: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponseApi<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchases: (purchaseIds: string[]) => {
    return http.delete<SuccessResponseApi<{ deleted_count: number }>>(URL, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
