import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { myPageApi } from '../api/myPageApi'
import OrderHistory from '../components/OrderHistory'
import type { MyPageInfo, MyPageUpdatePayload } from '../api/myPageApi'

export default function MyPage() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const [info, setInfo] = useState<MyPageInfo | null>(null)
  const [form, setForm] = useState<MyPageUpdatePayload>({
    nmUser: '',
    nmEmail: '',
    noMobile: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 비로그인 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  // 내 정보 조회
  useEffect(() => {
    if (!isLoggedIn) return
    myPageApi.getMyInfo()
      .then(res => {
        setInfo(res.data)
        setForm({
          nmUser: res.data.nmUser,
          nmEmail: res.data.nmEmail,
          noMobile: res.data.noMobile,
        })
      })
      .catch(() => setError('정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  const handleUpdate = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await myPageApi.updateMyInfo(form)
      setInfo(prev => prev ? { ...prev, ...form } : prev)
      setEditMode(false)
      setSuccess('정보가 수정되었습니다.')
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '수정에 실패했습니다.'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (!info) return
    setForm({
      nmUser: info.nmUser,
      nmEmail: info.nmEmail,
      noMobile: info.noMobile,
    })
    setEditMode(false)
    setError('')
  }

  const handleDelete = async () => {
    if (!confirm('정말로 탈퇴하시겠습니까?\n탈퇴 요청 후 관리자 승인 후 처리됩니다.')) return
    try {
      await myPageApi.deleteMyInfo()
      logout()
      navigate('/')
    } catch {
      setError('탈퇴 요청에 실패했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-light tracking-widest mb-12">MY PAGE</h1>

      {/* 내 정보 */}
      <div className="border border-gray-100 p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm tracking-wider">내 정보</h2>
          {!editMode && (
            <button
              onClick={() => { setEditMode(true); setSuccess('') }}
              className="text-sm underline hover:text-gray-500 transition"
            >
              수정
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* 아이디 - 수정 불가 */}
          <div>
            <label className="block text-xs tracking-wider mb-1 text-gray-400">ID</label>
            <p className="text-sm text-gray-500">{info?.idUser}</p>
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-xs tracking-wider mb-1 text-gray-600">FULL NAME</label>
            {editMode ? (
              <input
                value={form.nmUser}
                onChange={e => setForm({ ...form, nmUser: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black transition"
              />
            ) : (
              <p className="text-sm">{info?.nmUser}</p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-xs tracking-wider mb-1 text-gray-600">EMAIL</label>
            {editMode ? (
              <input
                type="email"
                value={form.nmEmail}
                onChange={e => setForm({ ...form, nmEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black transition"
              />
            ) : (
              <p className="text-sm">{info?.nmEmail}</p>
            )}
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-xs tracking-wider mb-1 text-gray-600">PHONE</label>
            {editMode ? (
              <input
                type="tel"
                value={form.noMobile}
                onChange={e => setForm({ ...form, noMobile: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black transition"
              />
            ) : (
              <p className="text-sm">{info?.noMobile}</p>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
        {success && <p className="text-sm text-green-600 mt-4">{success}</p>}

        {editMode && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="flex-1 bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {saving ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-200 py-3 text-sm tracking-wider hover:bg-gray-50 transition"
            >
              취소
            </button>
          </div>
        )}
      </div>

      {/* 주문 내역 */}
      <OrderHistory />

      {/* 탈퇴 */}
      <div className="border border-gray-100 p-8">
        <h2 className="text-sm tracking-wider mb-2">회원 탈퇴</h2>
        <p className="text-xs text-gray-400 mb-6">
          탈퇴 요청 후 관리자 승인을 거쳐 처리됩니다.
        </p>
        <button
          onClick={handleDelete}
          className="text-sm text-red-400 underline hover:text-red-600 transition"
        >
          탈퇴 요청
        </button>
      </div>
    </div>
  )
}