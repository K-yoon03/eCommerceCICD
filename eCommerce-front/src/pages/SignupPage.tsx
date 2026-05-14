import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { authApi } from '../api/authApi'

export default function SignupPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    idUser: '',
    nmUser: '',
    nmPaswd: '',
    confirmPassword: '',
    noMobile: '',
    nmEmail: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.nmPaswd !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await authApi.signup({
        idUser: formData.idUser,
        nmUser: formData.nmUser,
        nmPaswd: formData.nmPaswd,
        noMobile: formData.noMobile,
        nmEmail: formData.nmEmail,
      })
      navigate('/login', { state: { message: '회원가입이 완료되었습니다.' } })
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ?? '회원가입에 실패했습니다.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight mb-3">Create Account</h2>
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="underline hover:text-black">Sign in</Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="idUser" className="block text-xs tracking-wider mb-2 text-gray-700">ID</label>
            <input id="idUser" name="idUser" type="text" required
              value={formData.idUser} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="사용할 아이디를 입력하세요" />
          </div>

          <div>
            <label htmlFor="nmUser" className="block text-xs tracking-wider mb-2 text-gray-700">FULL NAME</label>
            <input id="nmUser" name="nmUser" type="text" required
              value={formData.nmUser} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="이름을 입력하세요" />
          </div>

          <div>
            <label htmlFor="nmEmail" className="block text-xs tracking-wider mb-2 text-gray-700">EMAIL</label>
            <input id="nmEmail" name="nmEmail" type="email" required
              value={formData.nmEmail} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="your@email.com" />
          </div>

          <div>
            <label htmlFor="noMobile" className="block text-xs tracking-wider mb-2 text-gray-700">PHONE NUMBER</label>
            <input id="noMobile" name="noMobile" type="tel" required
              value={formData.noMobile} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="010-1234-5678" />
          </div>

          <div>
            <label htmlFor="nmPaswd" className="block text-xs tracking-wider mb-2 text-gray-700">PASSWORD</label>
            <input id="nmPaswd" name="nmPaswd" type="password" required
              value={formData.nmPaswd} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="8자 이상 입력하세요" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs tracking-wider mb-2 text-gray-700">CONFIRM PASSWORD</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required
              value={formData.confirmPassword} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="비밀번호를 다시 입력하세요" />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors disabled:bg-gray-400">
            {loading ? '처리 중...' : 'CREATE ACCOUNT'}
          </button>

          <p className="text-xs text-center text-gray-500 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  )
}