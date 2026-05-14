import { Link, Outlet, useLocation } from 'react-router'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag } from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: '상품 관리', icon: Package },
  { to: '/admin/orders', label: '주문 관리', icon: ShoppingBag },
  { to: '/admin/users', label: '사용자 관리', icon: Users },
  { to: '/admin/categories', label: '카테고리 관리', icon: Tag },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="text-lg font-light tracking-widest">HYAN</Link>
          <span className="ml-2 text-xs text-gray-400 tracking-wider">ADMIN</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
