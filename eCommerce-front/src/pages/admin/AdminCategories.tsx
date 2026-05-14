import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "전자제품", productCount: 120, description: "전자제품 카테고리" },
    { id: 2, name: "패션", productCount: 250, description: "의류 및 패션 아이템" },
    { id: 3, name: "식품", productCount: 180, description: "식품 및 음료" },
    { id: 4, name: "가구", productCount: 90, description: "가구 및 인테리어" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleAdd = () => {
    if (!newCategory.name.trim()) {
      alert("카테고리 이름을 입력하세요.");
      return;
    }
    const category = {
      id: categories.length + 1,
      name: newCategory.name,
      description: newCategory.description,
      productCount: 0,
    };
    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "" });
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("정말로 이 카테고리를 삭제하시겠습니까?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">카테고리 관리</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          카테고리 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                상품 수: <span className="font-bold">{category.productCount}개</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">카테고리 추가</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리 이름
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: 전자제품"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="카테고리 설명을 입력하세요"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
