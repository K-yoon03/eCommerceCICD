import { useEffect, useState } from 'react'
import { Users, Package, ShoppingBag, TrendingUp } from 'lucide-react'
import { productApi } from '../../api/productApi'
import { adminApi } from '../../api/adminApi'

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null)
  const [userCount, setUserCount] = useState<number | null>(null)
  const [orderCount, setOrderCount] = useState<number | null>(null)
  const [revenue, setRevenue] = useState<number | null>(null)
  const [recentOrders, setRecentOrders] = useState<typeof import('../../api/adminApi').AdminOrderInfo[]>([])

  useEffect(() => {
    productApi.getProducts({ page: 0, size: 1 })
      .then(res => setProductCount(res.data.totalElements))
      .catch(() => setProductCount(0))

    adminApi.getUsers()
      .then(res => setUserCount(res.data.length))
      .catch(() => setUserCount(0))

    adminApi.getOrders()
      .then(res => {
        setOrderCount(res.data.length)
        const total = res.data.reduce((sum, o) =>
          sum + (o.qtOrderAmount ?? 0), 0)
        setRevenue(total)
        setRecentOrders(res.data.slice(0, 5))
      })
      .catch(() => { setOrderCount(0); setRevenue(0) })
  }, [])

  const STATUS_LABEL: Record<string, string> = {
    '10': '주문완료', '20': '배송중', '30': '배송완료', '40': '취소',
  }
  const STATUS_STYLE: Record<string, string> = {
    '10': 'bg-yellow-100 text-yellow-800',
    '20': 'bg-blue-100 text-blue-800',
    '30': 'bg-green-100 text-green-800',
    '40': 'bg-red-100 text-red-800',
  }

  const stats = [
    { name: 'Total Users',    value: userCount,    icon: Users,       format: (v: number) => `${v}명` },
    { name: 'Total Products', value: productCount, icon: Package,     format: (v: number) => `${v}개` },
    { name: 'Total Orders',   value: orderCount,   icon: ShoppingBag, format: (v: number) => `${v}건` },
    { name: 'Revenue',        value: revenue,      icon: TrendingUp,  format: (v: number) => `${v.toLocaleString()}원` },
  ]

  return (
    <div>
      <h1 className="text-2xl font-light tracking-tight mb-12">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="border border-gray-100 p-6 hover:border-gray-200 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-2xl font-light mb-1">
                {stat.value === null ? '...' : stat.format(stat.value)}
              </p>
              <p className="text-xs text-gray-500 tracking-wide">{stat.name}</p>
            </div>
          )
        })}
      </div>

      <div className="border border-gray-100 p-8">
        <h2 className="text-sm tracking-wider mb-6">RECENT ORDERS</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">주문이 없습니다.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['주문번호', '주문자', '금액', '상태', '주문일'].map(h => (
                  <th key={h} className="pb-3 text-left text-xs font-medium text-gray-400 tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map(o => (
                <tr key={o.idOrder} className="hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">{o.idOrder}</td>
                  <td className="py-3 text-sm">{o.nmOrderPerson}</td>
                  <td className="py-3 text-sm">{o.qtOrderAmount?.toLocaleString()}원</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_STYLE[o.stOrder ?? ''] ?? 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABEL[o.stOrder ?? ''] ?? o.stOrder}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    {o.daOrder ? new Date(o.daOrder).toLocaleDateString('ko-KR') : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}