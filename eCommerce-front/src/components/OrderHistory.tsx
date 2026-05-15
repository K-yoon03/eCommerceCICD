import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { orderApi } from '../api/orderApi'
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

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderApi.getMyOrders()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="border border-gray-100 p-8 mb-8">
      <h2 className="text-sm tracking-wider mb-6">주문 내역</h2>

      {loading ? (
        <p className="text-sm text-gray-400">불러오는 중...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-400">주문 내역이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Link
              key={order.idOrder}
              to={`/orders/${order.idOrder}`}
              className="block border border-gray-100 p-5 hover:border-gray-300 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400">
                  {order.daOrder ? new Date(order.daOrder).toLocaleDateString('ko-KR') : '-'}
                </p>
                <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_STYLE[order.stOrder ?? ''] ?? 'bg-gray-100 text-gray-600'}`}>
                  {STATUS_LABEL[order.stOrder ?? ''] ?? order.stOrder}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-1">{order.idOrder}</p>
              <p className="text-sm">
                {order.items[0]?.nmProduct}
                {order.items.length > 1 && ` 외 ${order.items.length - 1}건`}
              </p>
              <p className="text-sm font-medium mt-2">
                {order.qtOrderAmount?.toLocaleString()}원
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}