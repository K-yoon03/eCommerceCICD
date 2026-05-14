import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { authApi } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import { USER_TYPE } from '../constants/userConstants'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ idUser: '', nmPaswd: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await authApi.login(formData)
      login(res.data)

      if (res.data.cdUserType === USER_TYPE.ADMIN) {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '로그인에 실패했습니다.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight mb-3">Welcome Back</h2>
          <p className="text-sm text-gray-600">
            New to HYAN?{' '}
            <Link to="/signup" className="underline hover:text-black">
              Create an account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="idUser" className="block text-xs tracking-wider mb-2 text-gray-700">
              ID
            </label>
            <input
              id="idUser" name="idUser" type="text" required
              value={formData.idUser} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="nmPaswd" className="block text-xs tracking-wider mb-2 text-gray-700">
              PASSWORD
            </label>
            <input
              id="nmPaswd" name="nmPaswd" type="password" required
              value={formData.nmPaswd} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          >
            {loading ? '로그인 중...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  )
}