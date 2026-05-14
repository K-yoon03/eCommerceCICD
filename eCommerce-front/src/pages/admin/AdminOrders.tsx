import { useState } from 'react'
import { Search } from 'lucide-react'

// TODO: 주문 API 연동 후 실제 데이터로 교체
interface OrderItem {
  idOrder: string
  nmUser: string
  qtOrderAmount: number
  stOrder: string
  daOrder: string
  nmDeliveryAddress: string
}

export default function AdminOrders() {
  const [orders] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = orders.filter(o => {
    const matchesSearch = o.nmUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.idOrder.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.stOrder === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '10': return 'bg-yellow-100 text-yellow-800'  // 주문완료
      case '20': return 'bg-blue-100 text-blue-800'      // 배송중
      case '30': return 'bg-green-100 text-green-800'    // 배송완료
      case '40': return 'bg-red-100 text-red-800'        // 취소
      default:   return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case '10': return '주문완료'
      case '20': return '배송중'
      case '30': return '배송완료'
      case '40': return '취소'
      default:   return status
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-light tracking-tight mb-8">주문 관리</h1>

      <div className="bg-white border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="주문번호 또는 고객명 검색..."
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
              <option value="10">주문완료</option>
              <option value="20">배송중</option>
              <option value="30">배송완료</option>
              <option value="40">취소</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['주문번호', '고객명', '금액', '상태', '주문일', '배송지'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-gray-400">
                    주문 API 연동 후 표시됩니다.
                  </td>
                </tr>
              ) : (
                filtered.map(o => (
                  <tr key={o.idOrder} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">#{o.idOrder}</td>
                    <td className="px-6 py-4 text-sm">{o.nmUser}</td>
                    <td className="px-6 py-4 text-sm">{o.qtOrderAmount.toLocaleString()}원</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(o.stOrder)}`}>
                        {getStatusLabel(o.stOrder)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{o.daOrder}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{o.nmDeliveryAddress}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}