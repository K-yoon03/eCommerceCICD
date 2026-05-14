import { useState } from "react";
import { User, Package, Settings, LogOut } from "lucide-react";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  const [profileData, setProfileData] = useState({
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
  });

  const orders = [
    { id: 1, date: "2026-05-10", total: 89000, status: "배송완료", items: 2 },
    { id: 2, date: "2026-05-05", total: 259000, status: "배송중", items: 1 },
    { id: 3, date: "2026-04-28", total: 45000, status: "배송완료", items: 1 },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 프로필 업데이트 로직
    // TODO: API 연동
  };

  const handleDeleteAccount = () => {
    if (confirm("정말로 회원 탈퇴하시겠습니까?")) {
      // TODO: 회원 탈퇴 로직
      // TODO: API 연동
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="font-bold">{profileData.name}</h2>
              <p className="text-sm text-gray-600">{profileData.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                회원정보 수정
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-2 rounded-lg transition ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                주문 내역
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5 mr-3" />
                회원 탈퇴
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">회원정보 수정</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    주소
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  저장하기
                </button>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">주문 내역</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">주문번호: {order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "배송완료"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-600">
                        {order.items}개 상품
                      </p>
                      <p className="font-bold text-blue-600">
                        {order.total.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
