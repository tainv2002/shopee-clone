import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchasesList: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponseApi<Purchase[]>>(URL, {
      params
    })
  }
}

export default purchaseApi
