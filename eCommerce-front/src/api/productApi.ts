import api from './api'

export interface ProductList {
  noProduct: string
  nmProduct: string
  qtSalePrice: number
  qtCustomer: number | null
  nbThumbnail: number | null
  qtStock: number | null
}

export interface ProductDetail {
  noProduct: string
  nmProduct: string
  nmDetailExplain: string | null
  dtStartDate: string | null
  dtEndDate: string | null
  qtCustomer: number | null
  qtSalePrice: number
  qtStock: number | null
  qtDeliveryFee: number | null
  nbThumbnail: number | null
  categoryIds: number[]
}

export interface ProductSavePayload {
  noProduct: string
  nmProduct: string
  nmDetailExplain?: string
  dtStartDate?: string
  dtEndDate?: string
  qtCustomer?: number
  qtSalePrice: number
  qtStock?: number
  qtDeliveryFee?: number
  nbThumbnail?: number
  categoryIds?: number[]
}

export const productApi = {
  getProducts: () =>
    api.get<ProductList[]>('/api/products'),

  getProduct: (noProduct: string) =>
    api.get<ProductDetail>(`/api/products/${noProduct}`),

  createProduct: (data: ProductSavePayload) =>
    api.post<{ message: string }>('/api/admin/products', data),

  updateProduct: (noProduct: string, data: ProductSavePayload) =>
    api.put<{ message: string }>(`/api/admin/products/${noProduct}`, data),

  deleteProduct: (noProduct: string) =>
    api.delete<{ message: string }>(`/api/admin/products/${noProduct}`),
}