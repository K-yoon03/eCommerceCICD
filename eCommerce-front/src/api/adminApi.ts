import api from './api'
import type { OrderItemInfo } from './orderApi'

export interface AdminUserInfo {
  idUser: string
  nmUser: string
  nmEmail: string
  noMobile: string
  stStatus: string
  cdUserType: string
  daFirstDate: string | null
}

export interface AdminOrderInfo {
  idOrder: string
  idUser: string
  qtOrderAmount: number | null
  qtDeliMoney: number | null
  nmOrderPerson: string | null
  nmReceiver: string | null
  nmDeliveryAddress: string | null
  nmReceiverTelno: string | null
  daOrder: string | null
  stOrder: string | null
  stPayment: string | null
  items: OrderItemInfo[]
}

export const adminApi = {
  getUsers: () =>
    api.get<AdminUserInfo[]>('/api/admin/users'),

  updateUserStatus: (idUser: string, stStatus: string) =>
    api.put<{ message: string }>(`/api/admin/users/${idUser}/status`, { stStatus }),

  deleteUser: (idUser: string) =>
    api.delete<{ message: string }>(`/api/admin/users/${idUser}`),

  getOrders: () =>
    api.get<AdminOrderInfo[]>('/api/admin/orders'),

  updateOrderStatus: (idOrder: string, stOrder: string) =>
    api.put<{ message: string }>(`/api/admin/orders/${idOrder}/status`, { stOrder }),
}