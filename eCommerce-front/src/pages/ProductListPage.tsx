import { useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";

export default function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "accessories", name: "Accessories" },
  ];

  const products = [
    { id: 1, name: "Wireless Earbuds", price: 89000, category: "electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop" },
    { id: 2, name: "Smart Watch", price: 259000, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop" },
    { id: 3, name: "Laptop Stand", price: 45000, category: "accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop" },
    { id: 4, name: "USB-C Cable", price: 15000, category: "accessories", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop" },
    { id: 5, name: "Minimal T-Shirt", price: 29000, category: "fashion", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" },
    { id: 6, name: "Premium Denim", price: 69000, category: "fashion", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop" },
    { id: 7, name: "Ceramic Mug", price: 35000, category: "lifestyle", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop" },
    { id: 8, name: "Desk Organizer", price: 150000, category: "lifestyle", image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&h=500&fit=crop" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">All Products</h1>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm tracking-wider mb-6 font-medium">CATEGORIES</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left text-sm py-2 px-4 transition-colors ${
                      selectedCategory === category.id
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-sm tracking-wider mb-6 font-medium">SEARCH</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group"
                  >
                    <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm tracking-wide mb-2 group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ₩{product.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
