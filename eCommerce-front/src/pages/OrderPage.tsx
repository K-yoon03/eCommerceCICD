import { useState } from "react";
import { useNavigate } from "react-router";

export default function OrderPage() {
  const navigate = useNavigate();

  const [orderInfo, setOrderInfo] = useState({
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@example.com",
    address: "서울시 강남구 테헤란로 123",
    detailAddress: "3층 301호",
    message: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const cartItems = [
    { id: 1, name: "무선 이어폰", price: 89000, quantity: 1 },
    { id: 2, name: "스마트 워치", price: 259000, quantity: 2 },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = totalPrice >= 50000 ? 0 : 3000;
  const finalTotal = totalPrice + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 주문 처리 로직
    // TODO: API 연동
    alert("주문이 완료되었습니다!");
    navigate("/mypage");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">주문 상품</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center pb-4 border-b last:border-b-0"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        수량: {item.quantity}개
                      </p>
                    </div>
                    <p className="font-bold">
                      {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">배송 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    받는 사람
                  </label>
                  <input
                    type="text"
                    required
                    value={orderInfo.name}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연락처
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderInfo.phone}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, phone: e.target.value })
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
                    required
                    value={orderInfo.email}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, email: e.target.value })
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
                    required
                    value={orderInfo.address}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, address: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="상세 주소"
                    value={orderInfo.detailAddress}
                    onChange={(e) =>
                      setOrderInfo({
                        ...orderInfo,
                        detailAddress: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    배송 메시지
                  </label>
                  <textarea
                    rows={3}
                    value={orderInfo.message}
                    onChange={(e) =>
                      setOrderInfo({ ...orderInfo, message: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="배송 시 요청사항을 입력하세요"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">결제 방법</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>신용/체크카드</span>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>계좌이체</span>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="phone"
                    checked={paymentMethod === "phone"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span>휴대폰 결제</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">결제 정보</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span>{shippingFee === 0 ? "무료" : shippingFee.toLocaleString() + "원"}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>최종 결제금액</span>
                  <span className="text-blue-600">
                    {finalTotal.toLocaleString()}원
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {finalTotal.toLocaleString()}원 결제하기
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p>• 주문 후 배송까지 평균 2-3일 소요됩니다.</p>
                <p>• 일부 상품은 배송이 지연될 수 있습니다.</p>
                <p>• 결제 후 주문 취소는 고객센터로 문의하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
