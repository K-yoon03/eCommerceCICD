import api from './api'

export interface BasketItemInfo {
  nbBasketItem: number
  noProduct: string
  nmProduct: string
  qtBasketItemPrice: number | null
  qtBasketItem: number | null
  qtBasketItemAmount: number | null
  nbThumbnail: number | null
}

export interface BasketInfo {
  nbBasket: number
  qtBasketAmount: number | null
  items: BasketItemInfo[]
}

export const basketApi = {
  getBasket: () =>
    api.get<BasketInfo>('/api/basket'),

  addItem: (data: { noProduct: string; qtBasketItem: number }) =>
    api.post<{ message: string }>('/api/basket/items', data),

  updateItem: (nbBasketItem: number, data: { qtBasketItem: number }) =>
    api.put<{ message: string }>(`/api/basket/items/${nbBasketItem}`, data),

  deleteItem: (nbBasketItem: number) =>
    api.delete<{ message: string }>(`/api/basket/items/${nbBasketItem}`),

  clearBasket: () =>
    api.delete<{ message: string }>('/api/basket'),
}