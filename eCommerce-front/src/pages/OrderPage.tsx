import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { basketApi } from '../api/basketApi'
import { orderApi } from '../api/orderApi'
import { fileApi } from '../api/fileApi'
import { useAuth } from '../context/AuthContext'
import type { BasketInfo } from '../api/basketApi'
import type { OrderCreatePayload } from '../api/orderApi'

const EMPTY_FORM: OrderCreatePayload = {
  nmOrderPerson: '',
  nmReceiver: '',
  noDeliveryZipno: '',
  nmDeliveryAddress: '',
  nmReceiverTelno: '',
  nmDeliverySpace: '',
}

export default function OrderPage() {
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuth()

  const [basket, setBasket] = useState<BasketInfo | null>(null)
  const [form, setForm] = useState<OrderCreatePayload>(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    basketApi.getBasket()
      .then(res => {
        if (res.data.items.length === 0) {
          navigate('/cart')
          return
        }
        setBasket(res.data)
        // 주문자명 자동 입력
        if (user?.nmUser) {
          setForm(prev => ({ ...prev, nmOrderPerson: user.nmUser, nmReceiver: user.nmUser }))
        }
      })
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  const handleSubmit = async () => {
    if (!form.nmOrderPerson || !form.nmReceiver || !form.nmDeliveryAddress || !form.nmReceiverTelno) {
      setError('필수 항목을 모두 입력해주세요.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await orderApi.createOrder(form)
      navigate(`/orders/${res.data.idOrder}`)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '주문에 실패했습니다.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
    </div>
  )

  const items = basket?.items ?? []

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-light tracking-widest mb-12">ORDER</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* 배송 정보 입력 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-gray-100 p-8">
            <h2 className="text-sm tracking-wider mb-6">DELIVERY INFO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">주문자명</label>
                <input value={form.nmOrderPerson}
                  onChange={e => setForm({ ...form, nmOrderPerson: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">수령인</label>
                <input value={form.nmReceiver}
                  onChange={e => setForm({ ...form, nmReceiver: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">수령인 연락처</label>
                <input value={form.nmReceiverTelno}
                  onChange={e => setForm({ ...form, nmReceiverTelno: e.target.value })}
                  placeholder="010-0000-0000"
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">우편번호</label>
                <input value={form.noDeliveryZipno}
                  onChange={e => setForm({ ...form, noDeliveryZipno: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">배송 주소</label>
                <input value={form.nmDeliveryAddress}
                  onChange={e => setForm({ ...form, nmDeliveryAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="block text-xs tracking-wider mb-1 text-gray-600">배송 장소 (선택)</label>
                <input value={form.nmDeliverySpace ?? ''}
                  onChange={e => setForm({ ...form, nmDeliverySpace: e.target.value })}
                  placeholder="예: 문 앞에 놓아주세요"
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
          </div>

          {/* 주문 품목 */}
          <div className="border border-gray-100 p-8">
            <h2 className="text-sm tracking-wider mb-6">ORDER ITEMS</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.nbBasketItem} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-100 shrink-0 overflow-hidden">
                    {item.nbThumbnail ? (
                      <img src={fileApi.getFileUrl(item.nbThumbnail)} alt={item.nmProduct}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">NO IMG</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.nmProduct}</p>
                    <p className="text-xs text-gray-500">수량 {item.qtBasketItem}개</p>
                  </div>
                  <p className="text-sm font-medium shrink-0">
                    {item.qtBasketItemAmount?.toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 결제 요약 */}
        <div className="lg:col-span-1">
          <div className="border border-gray-100 p-6 sticky top-24">
            <h2 className="text-sm tracking-wider mb-6">PAYMENT</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">상품 금액</span>
                <span>{basket?.qtBasketAmount?.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">배송비</span>
                <span>계산 중</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span>결제 금액</span>
                <span>{basket?.qtBasketAmount?.toLocaleString()}원~</span>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition disabled:bg-gray-400">
              {submitting ? '주문 중...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}