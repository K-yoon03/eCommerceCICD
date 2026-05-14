import { Users, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Users", value: "1,234", icon: Users },
    { name: "Total Products", value: "567", icon: Package },
    { name: "Total Orders", value: "890", icon: ShoppingBag },
    { name: "Revenue", value: "₩12,345,678", icon: TrendingUp },
  ];

  const recentOrders = [
    { id: 1, user: "Sarah Kim", product: "Wireless Earbuds", amount: 89000, status: "Shipped", date: "2026-05-14" },
    { id: 2, user: "James Park", product: "Smart Watch", amount: 259000, status: "Processing", date: "2026-05-14" },
    { id: 3, user: "Emily Lee", product: "Laptop Stand", amount: 45000, status: "Delivered", date: "2026-05-13" },
    { id: 4, user: "David Choi", product: "USB-C Cable", amount: 15000, status: "Processing", date: "2026-05-13" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-12">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="border border-gray-100 p-6 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-2xl font-light mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500 tracking-wide">{stat.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-100 p-8">
          <h2 className="text-sm tracking-wider mb-6">RECENT ORDERS</h2>
          <div className="space-y-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="pb-6 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium mb-1">{order.product}</p>
                    <p className="text-xs text-gray-500">
                      {order.user} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium mb-1">
                      ₩{order.amount.toLocaleString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 ${
                        order.status === "Delivered"
                          ? "bg-black text-white"
                          : order.status === "Shipped"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-100 p-8">
          <h2 className="text-sm tracking-wider mb-6">TOP PRODUCTS</h2>
          <div className="space-y-6">
            {[
              { name: "Wireless Earbuds", sales: 234 },
              { name: "Smart Watch", sales: 189 },
              { name: "Laptop Stand", sales: 156 },
              { name: "USB-C Cable", sales: 145 },
            ].map((product, index) => (
              <div
                key={product.name}
                className="flex justify-between items-center pb-6 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-6">#{index + 1}</span>
                  <span className="text-sm">{product.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {product.sales} sold
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
