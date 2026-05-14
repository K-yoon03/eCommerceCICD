import { Link, Outlet, useNavigate } from 'react-router'
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, isLoggedIn, isAdmin, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-light tracking-widest">
              HYAN
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/products" className="text-sm tracking-wider hover:text-gray-500 transition-colors">
                PRODUCTS
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/cart')} className="relative">
                <ShoppingCart className="w-5 h-5" />
              </button>

              {isLoggedIn ? (
                <>
                  {/* 로그인 된 사용자 이름 */}
                  <span className="hidden md:block text-sm text-gray-600">
                    {user?.nmUser}님
                  </span>

                  {/* 관리자면 대시보드 버튼 */}
                  {isAdmin && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="hidden md:block"
                      title="관리자 페이지"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                    </button>
                  )}

                  {/* 마이페이지 */}
                  <button onClick={() => navigate('/mypage')}>
                    <User className="w-5 h-5" />
                  </button>

                  {/* 로그아웃 */}
                  <button
                    onClick={handleLogout}
                    className="hidden md:block"
                    title="로그아웃"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/login')}>
                  <User className="w-5 h-5" />
                </button>
              )}

              <button
                className="md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-4 space-y-4">
            <Link to="/products" className="block text-sm tracking-wider" onClick={() => setMenuOpen(false)}>
              PRODUCTS
            </Link>

            {isLoggedIn ? (
              <>
                <span className="block text-sm text-gray-500">{user?.nmUser}님</span>
                <Link to="/mypage" className="block text-sm tracking-wider" onClick={() => setMenuOpen(false)}>
                  MY PAGE
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block text-sm tracking-wider" onClick={() => setMenuOpen(false)}>
                    ADMIN
                  </Link>
                )}
                <button onClick={handleLogout} className="block text-sm tracking-wider text-left w-full">
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-sm tracking-wider" onClick={() => setMenuOpen(false)}>
                  LOGIN
                </Link>
                <Link to="/signup" className="block text-sm tracking-wider" onClick={() => setMenuOpen(false)}>
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <p className="text-xl font-light tracking-widest mb-3">HYAN</p>
              <p className="text-sm text-gray-500">Refined Living, Simplified</p>
            </div>
            <div className="flex gap-12 text-sm text-gray-500">
              <div className="space-y-2">
                <p className="font-medium text-black tracking-wider">SHOP</p>
                <Link to="/products" className="block hover:text-black transition-colors">Products</Link>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-black tracking-wider">ACCOUNT</p>
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="block hover:text-black transition-colors">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="block hover:text-black transition-colors">Login</Link>
                    <Link to="/signup" className="block hover:text-black transition-colors">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-sm text-gray-400">
            © 2026 HYAN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}