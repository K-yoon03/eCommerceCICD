import api from './api'

export interface OrderItemInfo {
  idOrderItem: string
  noProduct: string
  nmProduct: string
  qtUnitPrice: number
  qtOrderItem: number
  qtOrderItemAmount: number | null
  qtOrderItemDeliveryFee: number
}

export interface OrderInfo {
  idOrder: string
  qtOrderAmount: number | null
  qtDeliMoney: number | null
  nmOrderPerson: string | null
  nmReceiver: string | null
  noDeliveryZipno: string | null
  nmDeliveryAddress: string | null
  nmReceiverTelno: string | null
  nmDeliverySpace: string | null
  cdOrderType: string | null
  daOrder: string | null
  stOrder: string | null
  stPayment: string | null
  items: OrderItemInfo[]
}

export interface OrderCreatePayload {
  nmOrderPerson: string
  nmReceiver: string
  noDeliveryZipno: string
  nmDeliveryAddress: string
  nmReceiverTelno: string
  nmDeliverySpace?: string
}

export const orderApi = {
  getMyOrders: () =>
    api.get<OrderInfo[]>('/api/orders'),

  getOrder: (idOrder: string) =>
    api.get<OrderInfo>(`/api/orders/${idOrder}`),

  createOrder: (data: OrderCreatePayload) =>
    api.post<OrderInfo>('/api/orders', data),

  cancelOrder: (idOrder: string) =>
    api.delete<{ message: string }>(`/api/orders/${idOrder}`),
}