import { Link } from "react-router";
import { ArrowRight, Package, Shield, Truck } from "lucide-react";

export default function HomePage() {
  const collections = [
    { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop" },
    { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop" },
    { id: 3, name: "Lifestyle", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop" },
  ];

  const featuredProducts = [
    { id: 1, name: "Wireless Earbuds", price: 89000, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop" },
    { id: 2, name: "Smart Watch", price: 259000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop" },
    { id: 3, name: "Laptop Stand", price: 45000, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop" },
    { id: 4, name: "USB-C Cable", price: 15000, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop" },
  ];

  return (
    <div>
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-6">
            Refined Living,<br/>
            <span className="font-normal">Simplified</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Discover curated products that elevate your everyday moments
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors group"
          >
            EXPLORE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-gray-200 mb-6">
                <Truck className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-sm tracking-wider mb-3 font-medium">FREE SHIPPING</h3>
              <p className="text-sm text-gray-600 leading-relaxed">On orders over ₩50,000</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-gray-200 mb-6">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-sm tracking-wider mb-3 font-medium">SECURE PAYMENT</h3>
              <p className="text-sm text-gray-600 leading-relaxed">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-gray-200 mb-6">
                <Package className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-sm tracking-wider mb-3 font-medium">EASY RETURNS</h3>
              <p className="text-sm text-gray-600 leading-relaxed">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Shop by Collection</h2>
            <Link to="/products" className="text-sm tracking-wider hover:underline hidden md:block">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to="/products"
                className="group relative aspect-[3/4] overflow-hidden bg-gray-100"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-light tracking-wide mb-2">{collection.name}</h3>
                  <span className="text-sm tracking-wider opacity-90 group-hover:underline">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Featured Products</h2>
            <p className="text-gray-600">Handpicked essentials for modern living</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                <h3 className="text-sm tracking-wide mb-2 group-hover:underline">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  ₩{product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            Join the HYAN Community
          </h2>
          <p className="text-lg text-gray-400 mb-12 font-light">
            Be the first to know about new arrivals and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
            />
            <button className="bg-white text-black px-8 py-4 text-sm tracking-wider hover:bg-gray-100 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
