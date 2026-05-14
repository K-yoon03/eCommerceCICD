import { useEffect, useState } from 'react'
import { Users, Package, ShoppingBag, TrendingUp } from 'lucide-react'
import { productApi } from '../../api/productApi'

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number | null>(null)

  useEffect(() => {
    productApi.getProducts()
      .then(res => setProductCount(res.data.length))
      .catch(() => setProductCount(0))
  }, [])

  const stats = [
    { name: 'Total Users',    value: '-',  icon: Users,       note: '// TODO: 사용자 API 연동' },
    { name: 'Total Products', value: productCount != null ? String(productCount) : '...', icon: Package, note: '' },
    { name: 'Total Orders',   value: '-',  icon: ShoppingBag, note: '// TODO: 주문 API 연동' },
    { name: 'Revenue',        value: '-',  icon: TrendingUp,  note: '// TODO: 매출 API 연동' },
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
              <p className="text-2xl font-light mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 tracking-wide">{stat.name}</p>
            </div>
          )
        })}
      </div>

      <div className="border border-gray-100 p-8">
        <h2 className="text-sm tracking-wider mb-4">RECENT ORDERS</h2>
        <p className="text-sm text-gray-400">주문 API 연동 후 표시됩니다.</p>
      </div>
    </div>
  )
}