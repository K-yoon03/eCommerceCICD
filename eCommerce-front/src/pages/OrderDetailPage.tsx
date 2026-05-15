import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { orderApi } from '../api/orderApi'
import { useAuth } from '../context/AuthContext'
import type { OrderInfo } from '../api/orderApi'

const STATUS_LABEL: Record<string, string> = {
  '10': '주문완료',
  '20': '배송중',
  '30': '배송완료',
  '40': '취소',
}

const STATUS_STYLE: Record<string, string> = {
  '10': 'bg-yellow-100 text-yellow-800',
  '20': 'bg-blue-100 text-blue-800',
  '30': 'bg-green-100 text-green-800',
  '40': 'bg-red-100 text-red-800',
}

export default function OrderDetailPage() {
  const { idOrder } = useParams<{ idOrder: string }>()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    if (!idOrder) return
    orderApi.getOrder(idOrder)
      .then(res => setOrder(res.data))
      .catch(() => setError('주문을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [isLoggedIn, idOrder])

  const handleCancel = async () => {
    if (!idOrder) return
    if (!confirm('주문을 취소하시겠습니까?')) return
    try {
      await orderApi.cancelOrder(idOrder)
      setOrder(prev => prev ? { ...prev, stOrder: '40' } : prev)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '취소에 실패했습니다.'
      alert(message)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
    </div>
  )

  if (error || !order) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-sm text-red-400">{error || '주문을 찾을 수 없습니다.'}</p>
      <Link to="/mypage" className="text-sm underline">마이페이지로 돌아가기</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-light tracking-widest">ORDER DETAIL</h1>
        <Link to="/mypage" className="text-sm text-gray-400 underline hover:text-gray-600">
          마이페이지
        </Link>
      </div>

      {/* 주문 상태 */}
      <div className="border border-gray-100 p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">주문번호</p>
            <p className="text-sm font-medium">{order.idOrder}</p>
          </div>
          <span className={`px-3 py-1 text-xs rounded-full ${STATUS_STYLE[order.stOrder ?? ''] ?? 'bg-gray-100 text-gray-600'}`}>
            {STATUS_LABEL[order.stOrder ?? ''] ?? order.stOrder}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          주문일: {order.daOrder ? new Date(order.daOrder).toLocaleDateString('ko-KR') : '-'}
        </p>
      </div>

      {/* 주문 품목 */}
      <div className="border border-gray-100 p-8 mb-6">
        <h2 className="text-sm tracking-wider mb-6">ORDER ITEMS</h2>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.idOrderItem} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium">{item.nmProduct}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.qtUnitPrice.toLocaleString()}원 × {item.qtOrderItem}개
                </p>
              </div>
              <p className="text-sm font-medium">
                {item.qtOrderItemAmount?.toLocaleString()}원
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 배송 정보 */}
      <div className="border border-gray-100 p-8 mb-6">
        <h2 className="text-sm tracking-wider mb-6">DELIVERY INFO</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-4">
            <span className="text-gray-400 w-20 shrink-0">주문자</span>
            <span>{order.nmOrderPerson}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-400 w-20 shrink-0">수령인</span>
            <span>{order.nmReceiver}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-400 w-20 shrink-0">연락처</span>
            <span>{order.nmReceiverTelno}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-gray-400 w-20 shrink-0">주소</span>
            <span>({order.noDeliveryZipno}) {order.nmDeliveryAddress}</span>
          </div>
          {order.nmDeliverySpace && (
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 shrink-0">배송 장소</span>
              <span>{order.nmDeliverySpace}</span>
            </div>
          )}
        </div>
      </div>

      {/* 결제 요약 */}
      <div className="border border-gray-100 p-8 mb-8">
        <h2 className="text-sm tracking-wider mb-6">PAYMENT</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">상품 금액</span>
            <span>{order.qtOrderAmount?.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">배송비</span>
            <span>{order.qtDeliMoney?.toLocaleString()}원</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-medium">
            <span>합계</span>
            <span>{((order.qtOrderAmount ?? 0) + (order.qtDeliMoney ?? 0)).toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 주문 취소 */}
      {order.stOrder === '10' && (
        <button
          onClick={handleCancel}
          className="w-full border border-red-300 text-red-400 py-3 text-sm tracking-wider hover:bg-red-50 transition">
          주문 취소
        </button>
      )}
    </div>
  )
}