import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { ShoppingCart, Heart, Star, Minus, Plus } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: parseInt(id || "1"),
    name: "Wireless Earbuds",
    price: 89000,
    description:
      "Premium wireless earbuds featuring advanced noise cancellation technology. Experience crystal-clear sound quality with ergonomic design for all-day comfort. Perfect for music lovers and professionals alike.",
    features: [
      "Active noise cancellation",
      "24-hour battery life",
      "Water-resistant IPX4",
      "Premium sound quality"
    ],
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606400082889-f9cfef98e1f6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598965675045-38f5a7d2a6b5?w=800&h=800&fit=crop",
    ],
    stock: 50,
  };

  const handleAddToCart = () => {
    // TODO: API 연동
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-black" : "opacity-60 hover:opacity-100"
                  } transition-opacity`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pt-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              {product.name}
            </h1>

            <p className="text-2xl mb-8">
              ₩{product.price.toLocaleString()}
            </p>

            <div className="border-t border-b border-gray-200 py-8 mb-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-2">
                <p className="text-sm tracking-wider mb-3">FEATURES</p>
                {product.features.map((feature, index) => (
                  <p key={index} className="text-sm text-gray-600">• {feature}</p>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm tracking-wider mb-4">QUANTITY</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border border-black text-black py-4 text-sm tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                ADD TO CART
              </button>
              <button className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors"
            >
              BUY NOW
            </button>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                Free shipping on orders over ₩50,000<br/>
                Easy returns within 30 days<br/>
                In stock: {product.stock} available
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-light tracking-tight mb-12">Customer Reviews</h2>
          <div className="space-y-8 max-w-3xl">
            {[
              { name: "Sarah Kim", rating: 5, date: "May 12, 2026", review: "Exceptional sound quality and comfort. Worth every penny." },
              { name: "James Park", rating: 5, date: "May 10, 2026", review: "Best wireless earbuds I've owned. The noise cancellation is impressive." },
              { name: "Emily Lee", rating: 4, date: "May 8, 2026", review: "Great product overall. Battery life is excellent." },
            ].map((review, index) => (
              <div key={index} className="pb-8 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-black">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-current" : "stroke-current fill-none"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-800 mb-2">{review.review}</p>
                <p className="text-sm text-gray-500">{review.name} • {review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
