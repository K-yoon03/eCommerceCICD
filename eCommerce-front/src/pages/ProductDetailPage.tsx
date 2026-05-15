import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { productApi } from '../api/productApi'
import { basketApi } from '../api/basketApi'
import { fileApi } from '../api/fileApi'
import { useAuth } from '../context/AuthContext'
import type { ProductDetail } from '../api/productApi'

export default function ProductDetailPage() {
  const { noProduct } = useParams<{ noProduct: string }>()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    if (!noProduct) return
    productApi.getProduct(noProduct)
      .then(res => setProduct(res.data))
      .catch(() => setError('상품을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [noProduct])

  const handleAddToCart = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    if (!product) return
    setAdding(true)
    try {
      await basketApi.addItem({ noProduct: product.noProduct, qtBasketItem: quantity })
      navigate('/cart')
    } catch {
      alert('장바구니 담기에 실패했습니다.')
    } finally {
      setAdding(false)
    }
  }

  const handleBuyNow = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    if (!product) return
    setAdding(true)
    try {
      await basketApi.addItem({ noProduct: product.noProduct, qtBasketItem: quantity })
      navigate('/order')
    } catch {
      alert('오류가 발생했습니다.')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-sm text-red-400">{error || '상품을 찾을 수 없습니다.'}</p>
        <button onClick={() => navigate('/products')} className="text-sm underline">
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* 썸네일 */}
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {product.nbThumbnail ? (
            <img
              src={fileApi.getFileUrl(product.nbThumbnail)}
              alt={product.nmProduct}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs tracking-wider">
              NO IMAGE
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-light tracking-wide">{product.nmProduct}</h1>

          <div className="space-y-1">
            {product.qtCustomer && (
              <p className="text-sm text-gray-400 line-through">
                {product.qtCustomer.toLocaleString()}원
              </p>
            )}
            <p className="text-2xl font-medium">
              {product.qtSalePrice.toLocaleString()}원
            </p>
          </div>

          <p className="text-sm text-gray-500">
            배송비{' '}
            {product.qtDeliveryFee
              ? `${product.qtDeliveryFee.toLocaleString()}원`
              : '무료'}
          </p>

          {product.qtStock !== null && (
            <p className="text-sm text-gray-500">
              재고 {product.qtStock.toLocaleString()}개
            </p>
          )}

          {/* 수량 */}
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-wider text-gray-700">QUANTITY</span>
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors disabled:bg-gray-400"
            >
              {adding ? '처리 중...' : 'ADD TO CART'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={adding}
              className="w-full border border-black py-4 text-sm tracking-wider hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              BUY NOW
            </button>
          </div>

          {product.nmDetailExplain && (
            <div className="border-t border-gray-100 pt-6 mt-4">
              <p className="text-xs tracking-wider text-gray-700 mb-3">DESCRIPTION</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.nmDetailExplain}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}