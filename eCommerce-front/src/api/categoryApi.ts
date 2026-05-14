import api from './api'

export interface CategoryItem {
  nbCategory: number
  nbParentCategory: number | null
  nmCategory: string
  nmFullCategory: string | null
  nmExplain: string | null
  cnLevel: number | null
  cnOrder: number
  ynUse: string | null
  ynDelete: string | null
}

export interface CategorySavePayload {
  nbCategory: number
  nbParentCategory?: number
  nmCategory: string
  nmFullCategory?: string
  nmExplain?: string
  cnLevel?: number
  cnOrder: number
  ynUse?: string
  ynDelete?: string
}

export const categoryApi = {
  getCategories: () =>
    api.get<CategoryItem[]>('/api/categories'),

  createCategory: (data: CategorySavePayload) =>
    api.post<{ message: string }>('/api/admin/categories', data),

  updateCategory: (nbCategory: number, data: CategorySavePayload) =>
    api.put<{ message: string }>(`/api/admin/categories/${nbCategory}`, data),

  deleteCategory: (nbCategory: number) =>
    api.delete<{ message: string }>(`/api/admin/categories/${nbCategory}`),
}