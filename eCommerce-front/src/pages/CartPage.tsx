import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { X, ShoppingBag, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Earbuds", price: 89000, quantity: 1, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop" },
    { id: 2, name: "Smart Watch", price: 259000, quantity: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
    { id: 3, name: "Laptop Stand", price: 45000, quantity: 1, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop" },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-500 text-lg mb-8">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 pb-6 border-b border-gray-100"
                  >
                    <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm tracking-wide">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        ₩{item.price.toLocaleString()}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <p className="font-medium">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-8 sticky top-24">
                <h2 className="text-sm tracking-wider mb-6">ORDER SUMMARY</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₩${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                </div>

                {subtotal < 50000 && (
                  <div className="bg-gray-50 p-4 mb-6 text-sm text-gray-600">
                    Add ₩{(50000 - subtotal).toLocaleString()} more for free shipping
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors mb-4"
                >
                  PROCEED TO CHECKOUT
                </button>

                <Link
                  to="/products"
                  className="block text-center text-sm tracking-wider hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
