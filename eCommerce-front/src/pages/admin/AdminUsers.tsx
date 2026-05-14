import { useState } from 'react'
import { Search, Edit, Trash2 } from 'lucide-react'
import { USER_TYPE } from '../../constants/userConstants'

// TODO: 사용자 API 연동 후 실제 데이터로 교체
interface UserItem {
  idUser: string
  nmUser: string
  nmEmail: string
  noMobile: string
  cdUserType: string
  stStatus: string
  daFirstDate: string
}

export default function AdminUsers() {
  const [users] = useState<UserItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = users.filter(u =>
    u.nmUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.nmEmail.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (_idUser: string) => {
    if (!confirm('정말로 이 사용자를 삭제하시겠습니까?')) return
    // TODO: 사용자 삭제 API 연동
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light tracking-tight">사용자 관리</h1>
      </div>

      <div className="bg-white border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="이름 또는 이메일 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['아이디', '이름', '이메일', '전화번호', '구분', '가입일', '관리'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-sm text-gray-400">
                    사용자 API 연동 후 표시됩니다.
                  </td>
                </tr>
              ) : (
                filtered.map(u => (
                  <tr key={u.idUser} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{u.idUser}</td>
                    <td className="px-6 py-4 text-sm font-medium">{u.nmUser}</td>
                    <td className="px-6 py-4 text-sm">{u.nmEmail}</td>
                    <td className="px-6 py-4 text-sm">{u.noMobile}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        u.cdUserType === USER_TYPE.ADMIN
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {u.cdUserType === USER_TYPE.ADMIN ? '관리자' : '일반'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.daFirstDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-black">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(u.idUser)} className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}