import { ProductListConfig, ProductList, Product } from 'src/types/product.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseApi<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponseApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi
