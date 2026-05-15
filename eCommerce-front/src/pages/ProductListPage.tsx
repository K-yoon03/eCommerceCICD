import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { productApi } from '../api/productApi'
import { categoryApi } from '../api/categoryApi'
import { fileApi } from '../api/fileApi'
import type { ProductList, ProductPage } from '../api/productApi'
import type { CategoryItem } from '../api/categoryApi'

const PAGE_SIZE = 12

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('category')
    ? Number(searchParams.get('category'))
    : undefined
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 0

  const [pageData, setPageData] = useState<ProductPage | null>(null)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 카테고리 목록 1회 로드
  useEffect(() => {
    categoryApi.getCategories().then(res => setCategories(res.data))
  }, [])

  // 상품 목록 - 카테고리/페이지 변경마다 재호출
  useEffect(() => {
    setLoading(true)
    setError('')
    productApi.getProducts({
      categoryId,
      page: currentPage,
      size: PAGE_SIZE,
    })
      .then(res => setPageData(res.data))
      .catch(() => setError('상품 목록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [categoryId, currentPage])

  const handleCategoryClick = (nbCategory?: number) => {
    const next = new URLSearchParams()
    if (nbCategory !== undefined) next.set('category', String(nbCategory))
    next.set('page', '0')
    setSearchParams(next)
  }

  const handlePageClick = (page: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(page))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const products: ProductList[] = pageData?.content ?? []
  const totalPages = pageData?.totalPages ?? 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* 헤더 */}
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="text-2xl font-light tracking-widest">PRODUCTS</h1>
        {pageData && (
          <p className="text-sm text-gray-400">
            총 {pageData.totalElements.toLocaleString()}개
          </p>
        )}
      </div>

      {/* 카테고리 필터 */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => handleCategoryClick(undefined)}
            className={`px-4 py-1.5 text-sm border transition ${
              categoryId === undefined
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            전체
          </button>
          {categories
            .filter(c => c.ynUse === 'Y' || c.ynUse === null)
            .map(cat => (
              <button
                key={cat.nbCategory}
                onClick={() => handleCategoryClick(cat.nbCategory)}
                className={`px-4 py-1.5 text-sm border transition ${
                  categoryId === cat.nbCategory
                    ? 'bg-black text-white border-black'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {cat.nmCategory}
              </button>
            ))}
        </div>
      )}

      {/* 상품 목록 */}
      {loading ? (
        <div className="min-h-64 flex items-center justify-center">
          <p className="text-sm text-gray-400 tracking-wider">LOADING...</p>
        </div>
      ) : error ? (
        <div className="min-h-64 flex items-center justify-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-64 flex items-center justify-center">
          <p className="text-sm text-gray-400">등록된 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link
              key={product.noProduct}
              to={`/products/${product.noProduct}`}
              className="group"
            >
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

              <p className="text-sm tracking-wide group-hover:text-gray-500 transition-colors truncate">
                {product.nmProduct}
              </p>

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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 mt-16">
          {/* 이전 버튼 */}
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={pageData?.first}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 text-sm text-gray-500 hover:border-black hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>

          {/* 페이지 번호 */}
          {Array.from({ length: totalPages }, (_, i) => i).map(page => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-9 h-9 flex items-center justify-center border text-sm transition ${
                page === currentPage
                  ? 'bg-black text-white border-black'
                  : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'
              }`}
            >
              {page + 1}
            </button>
          ))}

          {/* 다음 버튼 */}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={pageData?.last}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 text-sm text-gray-500 hover:border-black hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}