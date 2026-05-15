import { useEffect, useState, useRef } from 'react'
import { Search, Plus, Edit, Trash2, X, Upload } from 'lucide-react'
import { productApi } from '../../api/productApi'
import { fileApi } from '../../api/fileApi'
import { categoryApi } from '../../api/categoryApi'
import type { ProductList, ProductSavePayload } from '../../api/productApi'
import type { CategoryItem } from '../../api/categoryApi'

const EMPTY_FORM: ProductSavePayload = {
  noProduct: '',
  nmProduct: '',
  nmDetailExplain: '',
  dtStartDate: '',
  dtEndDate: '',
  qtCustomer: undefined,
  qtSalePrice: 0,
  qtStock: undefined,
  qtDeliveryFee: undefined,
  nbThumbnail: undefined,
  categoryIds: [],
}

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductList[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<string | null>(null)
  const [form, setForm] = useState<ProductSavePayload>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchProducts = () => {
    productApi.getProducts()
      .then(res => setProducts(res.data.content))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
    categoryApi.getCategories().then(res => setCategories(res.data))
  }, [])

  const filtered = products.filter(p =>
    p.nmProduct.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openCreate = () => {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setThumbnailPreview(null)
    setError('')
    setShowModal(true)
  }

  const openEdit = async (noProduct: string) => {
    try {
      const res = await productApi.getProduct(noProduct)
      const d = res.data
      setForm({
        noProduct: d.noProduct,
        nmProduct: d.nmProduct,
        nmDetailExplain: d.nmDetailExplain ?? '',
        dtStartDate: d.dtStartDate ?? '',
        dtEndDate: d.dtEndDate ?? '',
        qtCustomer: d.qtCustomer ?? undefined,
        qtSalePrice: d.qtSalePrice,
        qtStock: d.qtStock ?? undefined,
        qtDeliveryFee: d.qtDeliveryFee ?? undefined,
        nbThumbnail: d.nbThumbnail ?? undefined,
        categoryIds: d.categoryIds ?? [],
      })
      setThumbnailPreview(
        d.nbThumbnail ? fileApi.getFileUrl(d.nbThumbnail) : null
      )
      setEditTarget(noProduct)
      setError('')
      setShowModal(true)
    } catch {
      alert('상품 정보를 불러오지 못했습니다.')
    }
  }

  const handleDelete = async (noProduct: string) => {
    if (!confirm('정말로 이 상품을 삭제하시겠습니까?')) return
    try {
      await productApi.deleteProduct(noProduct)
      fetchProducts()
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await fileApi.upload(file)
      setForm(prev => ({ ...prev, nbThumbnail: res.data.nbFile }))
      setThumbnailPreview(fileApi.getFileUrl(res.data.nbFile))
    } catch {
      alert('파일 업로드에 실패했습니다.')
    } finally {
      setUploading(false)
    }
  }

  const toggleCategory = (nbCategory: number) => {
    const current = form.categoryIds ?? []
    const next = current.includes(nbCategory)
      ? current.filter(id => id !== nbCategory)
      : [...current, nbCategory]
    setForm(prev => ({ ...prev, categoryIds: next }))
  }

  const handleSubmit = async () => {
    setError('')
    try {
      if (editTarget) {
        await productApi.updateProduct(editTarget, form)
      } else {
        await productApi.createProduct(form)
      }
      setShowModal(false)
      fetchProducts()
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '저장에 실패했습니다.'
      setError(message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light tracking-tight">상품 관리</h1>
        <button
          onClick={openCreate}
          className="bg-black text-white px-4 py-2 text-sm tracking-wider hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          상품 추가
        </button>
      </div>

      <div className="bg-white border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="상품명 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-16 text-sm text-gray-400">불러오는 중...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['썸네일', '상품코드', '상품명', '판매가', '재고', '관리'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(p => (
                  <tr key={p.noProduct} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {p.nbThumbnail ? (
                        <img src={fileApi.getFileUrl(p.nbThumbnail)} alt={p.nmProduct}
                          className="w-12 h-12 object-cover bg-gray-100" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-300 text-xs">없음</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{p.noProduct}</td>
                    <td className="px-6 py-4 text-sm font-medium">{p.nmProduct}</td>
                    <td className="px-6 py-4 text-sm">{p.qtSalePrice.toLocaleString()}원</td>
                    <td className="px-6 py-4 text-sm">
                      {p.qtStock != null ? (
                        <span className={p.qtStock === 0 ? 'text-red-500' : ''}>
                          {p.qtStock === 0 ? '품절' : `${p.qtStock}개`}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => openEdit(p.noProduct)} className="text-gray-400 hover:text-black">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.noProduct)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 등록/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-light tracking-wide mb-6">
              {editTarget ? '상품 수정' : '상품 추가'}
            </h2>

            <div className="space-y-4">

              {/* 썸네일 */}
              <div>
                <label className="block text-xs tracking-wider mb-2 text-gray-600">썸네일</label>
                <div className="flex items-center gap-4">
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="썸네일" className="w-20 h-20 object-cover border border-gray-200" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-gray-300 text-xs border border-gray-200">없음</div>
                  )}
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm hover:bg-gray-50 transition disabled:opacity-50">
                      <Upload className="w-4 h-4" />
                      {uploading ? '업로드 중...' : '이미지 선택'}
                    </button>
                    {thumbnailPreview && (
                      <button type="button"
                        onClick={() => { setThumbnailPreview(null); setForm(prev => ({ ...prev, nbThumbnail: undefined })) }}
                        className="text-xs text-red-400 hover:text-red-600 text-left">
                        이미지 제거
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              {!editTarget && (
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">상품 코드</label>
                  <input value={form.noProduct}
                    onChange={e => setForm({ ...form, noProduct: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                </div>
              )}

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">상품명</label>
                <input value={form.nmProduct}
                  onChange={e => setForm({ ...form, nmProduct: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">판매가</label>
                <input type="number" value={form.qtSalePrice}
                  onChange={e => setForm({ ...form, qtSalePrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">소비자가</label>
                <input type="number" value={form.qtCustomer ?? ''}
                  onChange={e => setForm({ ...form, qtCustomer: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">재고</label>
                <input type="number" value={form.qtStock ?? ''}
                  onChange={e => setForm({ ...form, qtStock: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">배송비</label>
                <input type="number" value={form.qtDeliveryFee ?? ''}
                  onChange={e => setForm({ ...form, qtDeliveryFee: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">판매 시작일</label>
                  <input value={form.dtStartDate ?? ''} placeholder="YYYYMMDD"
                    onChange={e => setForm({ ...form, dtStartDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">판매 종료일</label>
                  <input value={form.dtEndDate ?? ''} placeholder="YYYYMMDD"
                    onChange={e => setForm({ ...form, dtEndDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                </div>
              </div>

              {/* 카테고리 다중 선택 */}
              <div>
                <label className="block text-xs tracking-wider mb-2 text-gray-600">카테고리</label>
                {categories.length === 0 ? (
                  <p className="text-xs text-gray-400">등록된 카테고리가 없습니다.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => {
                      const selected = (form.categoryIds ?? []).includes(cat.nbCategory)
                      return (
                        <button
                          key={cat.nbCategory}
                          type="button"
                          onClick={() => toggleCategory(cat.nbCategory)}
                          className={`px-3 py-1 text-xs border transition ${
                            selected
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {cat.nmCategory}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">상세 설명</label>
                <textarea value={form.nmDetailExplain ?? ''}
                  onChange={e => setForm({ ...form, nmDetailExplain: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black resize-none" />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit}
                className="flex-1 bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition">
                {editTarget ? '수정' : '등록'}
              </button>
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 py-3 text-sm tracking-wider hover:bg-gray-50 transition">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}