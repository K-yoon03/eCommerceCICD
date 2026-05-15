import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Trash2, Minus, Plus } from 'lucide-react'
import { basketApi } from '../api/basketApi'
import { fileApi } from '../api/fileApi'
import { useAuth } from '../context/AuthContext'
import type { BasketInfo } from '../api/basketApi'

export default function CartPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const [basket, setBasket] = useState<BasketInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    fetchBasket()
  }, [isLoggedIn])

  const fetchBasket = () => {
    basketApi.getBasket()
      .then(res => setBasket(res.data))
      .catch(() => setError('장바구니를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }

  const handleQuantity = async (nbBasketItem: number, current: number, delta: number) => {
    const next = current + delta
    if (next < 1) return
    try {
      await basketApi.updateItem(nbBasketItem, { qtBasketItem: next })
      fetchBasket()
    } catch {
      alert('수량 변경에 실패했습니다.')
    }
  }

  const handleDelete = async (nbBasketItem: number) => {
    try {
      await basketApi.deleteItem(nbBasketItem)
      fetchBasket()
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const handleClear = async () => {
    if (!confirm('장바구니를 비우시겠습니까?')) return
    try {
      await basketApi.clearBasket()
      fetchBasket()
    } catch {
      alert('실패했습니다.')
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
      <div className="flex items-baseline justify-between mb-12">
        <h1 className="text-2xl font-light tracking-widest">CART</h1>
        {items.length > 0 && (
          <button onClick={handleClear} className="text-sm text-gray-400 underline hover:text-gray-600">
            전체 삭제
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-400 mb-6">{error}</p>}

      {items.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-sm text-gray-400 mb-6">장바구니가 비어있습니다.</p>
          <Link to="/products" className="text-sm underline hover:text-gray-500">
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* 품목 목록 */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div key={item.nbBasketItem} className="flex gap-6 pb-6 border-b border-gray-100">
                {/* 썸네일 */}
                <div className="w-24 h-24 bg-gray-100 shrink-0 overflow-hidden">
                  {item.nbThumbnail ? (
                    <img src={fileApi.getFileUrl(item.nbThumbnail)} alt={item.nmProduct}
                      className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">NO IMG</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.noProduct}`}
                    className="text-sm font-medium hover:text-gray-500 transition truncate block mb-1">
                    {item.nmProduct}
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">
                    {item.qtBasketItemPrice?.toLocaleString()}원
                  </p>

                  {/* 수량 조절 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => handleQuantity(item.nbBasketItem, item.qtBasketItem ?? 1, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm">{item.qtBasketItem}</span>
                      <button
                        onClick={() => handleQuantity(item.nbBasketItem, item.qtBasketItem ?? 1, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => handleDelete(item.nbBasketItem)}
                      className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm font-medium shrink-0">
                  {item.qtBasketItemAmount?.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 p-6 sticky top-24">
              <h2 className="text-sm tracking-wider mb-6">ORDER SUMMARY</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">상품 금액</span>
                  <span>{basket?.qtBasketAmount?.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">배송비</span>
                  <span>주문 시 계산</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-sm font-medium">
                  <span>합계</span>
                  <span>{basket?.qtBasketAmount?.toLocaleString()}원</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/order')}
                className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition">
                ORDER NOW
              </button>
              <Link to="/products"
                className="block text-center text-sm text-gray-400 underline mt-4 hover:text-gray-600">
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}