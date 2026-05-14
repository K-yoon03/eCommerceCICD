import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { categoryApi } from '../../api/categoryApi'
import type { CategoryItem, CategorySavePayload } from '../../api/categoryApi'

const EMPTY_FORM: CategorySavePayload = {
  nbCategory: 0,
  nbParentCategory: undefined,
  nmCategory: '',
  nmFullCategory: '',
  nmExplain: '',
  cnLevel: undefined,
  cnOrder: 0,
  ynUse: 'Y',
  ynDelete: 'N',
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<number | null>(null)
  const [form, setForm] = useState<CategorySavePayload>(EMPTY_FORM)
  const [error, setError] = useState('')

  const fetchCategories = () => {
    categoryApi.getCategories()
      .then(res => setCategories(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCategories() }, [])

  const openCreate = () => {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setError('')
    setShowModal(true)
  }

  const openEdit = (cat: CategoryItem) => {
    setEditTarget(cat.nbCategory)
    setForm({
      nbCategory: cat.nbCategory,
      nbParentCategory: cat.nbParentCategory ?? undefined,
      nmCategory: cat.nmCategory,
      nmFullCategory: cat.nmFullCategory ?? '',
      nmExplain: cat.nmExplain ?? '',
      cnLevel: cat.cnLevel ?? undefined,
      cnOrder: cat.cnOrder,
      ynUse: cat.ynUse ?? 'Y',
      ynDelete: cat.ynDelete ?? 'N',
    })
    setError('')
    setShowModal(true)
  }

  const handleDelete = async (nbCategory: number) => {
    if (!confirm('정말로 이 카테고리를 삭제하시겠습니까?')) return
    try {
      await categoryApi.deleteCategory(nbCategory)
      fetchCategories()
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const handleSubmit = async () => {
    setError('')
    try {
      if (editTarget !== null) {
        await categoryApi.updateCategory(editTarget, form)
      } else {
        await categoryApi.createCategory(form)
      }
      setShowModal(false)
      fetchCategories()
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '저장에 실패했습니다.'
      setError(message)
    }
  }

  // 상위 카테고리 목록 (자기 자신 제외)
  const parentOptions = categories.filter(
    c => editTarget === null || c.nbCategory !== editTarget
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light tracking-tight">카테고리 관리</h1>
        <button
          onClick={openCreate}
          className="bg-black text-white px-4 py-2 text-sm tracking-wider hover:bg-gray-800 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          카테고리 추가
        </button>
      </div>

      {loading ? (
        <p className="text-center py-16 text-sm text-gray-400">불러오는 중...</p>
      ) : categories.length === 0 ? (
        <div className="border border-gray-100 p-16 text-center">
          <p className="text-sm text-gray-400">등록된 카테고리가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div key={cat.nbCategory} className="border border-gray-100 p-6 hover:border-gray-200 transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {cat.cnLevel && (
                      <span className="text-xs text-gray-400">Lv.{cat.cnLevel}</span>
                    )}
                    <h3 className="text-base font-medium">{cat.nmCategory}</h3>
                  </div>
                  {cat.nbParentCategory && (
                    <p className="text-xs text-gray-400 mb-1">
                      상위: {categories.find(c => c.nbCategory === cat.nbParentCategory)?.nmCategory ?? cat.nbParentCategory}
                    </p>
                  )}
                  {cat.nmExplain && (
                    <p className="text-sm text-gray-500">{cat.nmExplain}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(cat)} className="text-gray-400 hover:text-black">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.nbCategory)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  cat.ynUse === 'Y' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {cat.ynUse === 'Y' ? '사용' : '미사용'}
                </span>
                <span className="text-xs text-gray-400">순번 {cat.cnOrder}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 등록/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-light tracking-wide mb-6">
              {editTarget !== null ? '카테고리 수정' : '카테고리 추가'}
            </h2>

            <div className="space-y-4">
              {editTarget === null && (
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">카테고리 번호</label>
                  <input
                    type="number"
                    value={form.nbCategory || ''}
                    onChange={e => setForm({ ...form, nbCategory: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">카테고리 이름</label>
                <input
                  value={form.nmCategory}
                  onChange={e => setForm({ ...form, nmCategory: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  placeholder="예: 전자제품"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">상위 카테고리</label>
                <select
                  value={form.nbParentCategory ?? ''}
                  onChange={e => setForm({
                    ...form,
                    nbParentCategory: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                >
                  <option value="">없음 (최상위)</option>
                  {parentOptions.map(c => (
                    <option key={c.nbCategory} value={c.nbCategory}>
                      {c.nmCategory}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">전체 카테고리명</label>
                <input
                  value={form.nmFullCategory ?? ''}
                  onChange={e => setForm({ ...form, nmFullCategory: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  placeholder="예: 전자제품 > 이어폰"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">설명</label>
                <textarea
                  value={form.nmExplain ?? ''}
                  onChange={e => setForm({ ...form, nmExplain: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">레벨</label>
                  <input
                    type="number"
                    value={form.cnLevel ?? ''}
                    onChange={e => setForm({ ...form, cnLevel: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">순번</label>
                  <input
                    type="number"
                    value={form.cnOrder}
                    onChange={e => setForm({ ...form, cnOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">사용 여부</label>
                  <select
                    value={form.ynUse ?? 'Y'}
                    onChange={e => setForm({ ...form, ynUse: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  >
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider mb-1 text-gray-600">삭제 여부</label>
                  <select
                    value={form.ynDelete ?? 'N'}
                    onChange={e => setForm({ ...form, ynDelete: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
                  >
                    <option value="N">정상</option>
                    <option value="Y">삭제</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition"
              >
                {editTarget !== null ? '수정' : '등록'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 py-3 text-sm tracking-wider hover:bg-gray-50 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}