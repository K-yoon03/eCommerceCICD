import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { productApi } from '../api/productApi'
import { fileApi } from '../api/fileApi'
import type { ProductList } from '../api/productApi'

export default function ProductListPage() {
  const [products, setProducts] = useState<ProductList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    productApi.getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setError('상품 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-light tracking-widest mb-12">PRODUCTS</h1>

      {products.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-24">등록된 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link
              key={product.noProduct}
              to={`/products/${product.noProduct}`}
              className="group"
            >
              {/* 썸네일 */}
              <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                {product.nbThumbnail ? (
                  <img
                    src={fileApi.getFileUrl(product.nbThumbnail)}
                    alt={product.nmProduct}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs tracking-wider">
                    NO IMAGE
                  </div>
                )}
              </div>

              {/* 상품명 */}
              <p className="text-sm tracking-wide group-hover:text-gray-500 transition-colors truncate">
                {product.nmProduct}
              </p>

              {/* 가격 */}
              <div className="mt-1 space-y-0.5">
                {product.qtCustomer && (
                  <p className="text-xs text-gray-400 line-through">
                    {product.qtCustomer.toLocaleString()}원
                  </p>
                )}
                <p className="text-sm font-medium">
                  {product.qtSalePrice.toLocaleString()}원
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}