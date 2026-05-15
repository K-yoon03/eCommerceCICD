import { useEffect, useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { adminApi } from '../../api/adminApi'
import { USER_TYPE, USER_STATUS } from '../../constants/userConstants'
import type { AdminUserInfo } from '../../api/adminApi'

const STATUS_OPTIONS = [
  { value: USER_STATUS.NORMAL,       label: '정상' },
  { value: USER_STATUS.SUSPENDED,    label: '해지' },
  { value: USER_STATUS.WITHDRAW_REQ, label: '탈퇴요청' },
]

const STATUS_STYLE: Record<string, string> = {
  ST01: 'bg-green-100 text-green-800',
  ST02: 'bg-red-100 text-red-800',
  ST04: 'bg-yellow-100 text-yellow-800',
}

const STATUS_LABEL: Record<string, string> = {
  ST01: '정상',
  ST02: '해지',
  ST04: '탈퇴요청',
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUserInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUsers = () => {
    adminApi.getUsers()
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const filtered = users.filter(u =>
    u.nmUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.nmEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.idUser.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStatusChange = async (idUser: string, stStatus: string) => {
    try {
      await adminApi.updateUserStatus(idUser, stStatus)
      setUsers(prev => prev.map(u =>
        u.idUser === idUser ? { ...u, stStatus } : u
      ))
    } catch {
      alert('상태 변경에 실패했습니다.')
    }
  }

  const handleDelete = async (idUser: string) => {
    if (!confirm(`${idUser} 사용자를 삭제하시겠습니까?`)) return
    try {
      await adminApi.deleteUser(idUser)
      setUsers(prev => prev.filter(u => u.idUser !== idUser))
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '삭제에 실패했습니다.'
      alert(message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light tracking-tight">사용자 관리</h1>
        <p className="text-sm text-gray-400">총 {users.length}명</p>
      </div>

      <div className="bg-white border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="아이디, 이름, 이메일 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-16 text-sm text-gray-400">불러오는 중...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['아이디', '이름', '이메일', '전화번호', '구분', '상태', '가입일', '관리'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-sm text-gray-400">
                      사용자가 없습니다.
                    </td>
                  </tr>
                ) : filtered.map(u => (
                  <tr key={u.idUser} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{u.idUser}</td>
                    <td className="px-6 py-4 text-sm">{u.nmUser}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.nmEmail}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.noMobile}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        u.cdUserType === USER_TYPE.ADMIN
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {u.cdUserType === USER_TYPE.ADMIN ? '관리자' : '일반'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.cdUserType === USER_TYPE.ADMIN ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${STATUS_STYLE[u.stStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                          {STATUS_LABEL[u.stStatus] ?? u.stStatus}
                        </span>
                      ) : (
                        <select
                          value={u.stStatus}
                          onChange={e => handleStatusChange(u.idUser, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_STYLE[u.stStatus] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {u.daFirstDate ? new Date(u.daFirstDate).toLocaleDateString('ko-KR') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {u.cdUserType !== USER_TYPE.ADMIN && (
                        <button
                          onClick={() => handleDelete(u.idUser)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}