import api from './api'

export interface FileUploadResult {
  nbFile: number
  nmOrgFile: string
  nmContentType: string
  qtFileSize: number
}

export const fileApi = {
  upload: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post<FileUploadResult>('/api/admin/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getFileUrl: (nbFile: number) =>
    `${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/api/files/${nbFile}`,
}