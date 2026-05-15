import api from './api'

export interface MyPageInfo {
  idUser: string
  nmUser: string
  nmEmail: string
  noMobile: string
}

export interface MyPageUpdatePayload {
  nmUser: string
  nmEmail: string
  noMobile: string
}

export const myPageApi = {
  getMyInfo: () =>
    api.get<MyPageInfo>('/api/my'),

  updateMyInfo: (data: MyPageUpdatePayload) =>
    api.put<{ message: string }>('/api/my', data),

  deleteMyInfo: () =>
    api.delete<{ message: string }>('/api/my'),
}