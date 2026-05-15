import { useEffect, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { adminApi } from '../../api/adminApi'
import type { AdminOrderInfo } from '../../api/adminApi'

const STATUS_OPTIONS = [
  { value: '10', label: '주문완료' },
  { value: '20', label: '배송중' },
  { value: '30', label: '배송완료' },
  { value: '40', label: '취소' },
]

const STATUS_STYLE: Record<string, string> = {
  '10': 'bg-yellow-100 text-yellow-800',
  '20': 'bg-blue-100 text-blue-800',
  '30': 'bg-green-100 text-green-800',
  '40': 'bg-red-100 text-red-800',
}

const STATUS_LABEL: Record<string, string> = {
  '10': '주문완료',
  '20': '배송중',
  '30': '배송완료',
  '40': '취소',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrderInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchOrders = () => {
    adminApi.getOrders()
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  const filtered = orders.filter(o => {
    const matchSearch =
      o.idOrder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.nmOrderPerson ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.idUser.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.stOrder === statusFilter
    return matchSearch && matchStatus
  })

  const handleStatusChange = async (idOrder: string, stOrder: string) => {
    try {
      await adminApi.updateOrderStatus(idOrder, stOrder)
      setOrders(prev => prev.map(o =>
        o.idOrder === idOrder ? { ...o, stOrder } : o
      ))
    } catch {
      alert('상태 변경에 실패했습니다.')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light tracking-tight">주문 관리</h1>
        <p className="text-sm text-gray-400">총 {orders.length}건</p>
      </div>

      <div className="bg-white border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="주문번호, 주문자, 아이디 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
          >
            <option value="all">전체 상태</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-16 text-sm text-gray-400">불러오는 중...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['주문번호', '주문자', '금액', '배송지', '상태', '주문일', ''].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-sm text-gray-400">
                      주문이 없습니다.
                    </td>
                  </tr>
                ) : filtered.map(o => (
                  <>
                    <tr key={o.idOrder} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{o.idOrder}</td>
                      <td className="px-6 py-4 text-sm">
                        <p>{o.nmOrderPerson}</p>
                        <p className="text-xs text-gray-400">{o.idUser}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {o.qtOrderAmount?.toLocaleString()}원
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {o.nmDeliveryAddress}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={o.stOrder ?? ''}
                          onChange={e => handleStatusChange(o.idOrder, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_STYLE[o.stOrder ?? ''] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {o.daOrder ? new Date(o.daOrder).toLocaleDateString('ko-KR') : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setExpanded(expanded === o.idOrder ? null : o.idOrder)}
                          className="text-gray-400 hover:text-black transition"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${expanded === o.idOrder ? 'rotate-180' : ''}`} />
                        </button>
                      </td>
                    </tr>

                    {/* 주문 품목 펼치기 */}
                    {expanded === o.idOrder && (
                      <tr key={`${o.idOrder}-detail`}>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-2">
                            {o.items.map(item => (
                              <div key={item.idOrderItem} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  {item.nmProduct} × {item.qtOrderItem}개
                                </span>
                                <span>{item.qtOrderItemAmount?.toLocaleString()}원</span>
                              </div>
                            ))}
                            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-medium">
                              <span>배송비</span>
                              <span>{o.qtDeliMoney?.toLocaleString()}원</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}