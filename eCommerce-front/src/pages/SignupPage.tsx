import { Link } from "react-router";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight mb-3">
            Create Account
          </h2>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-black">
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-xs tracking-wider mb-2 text-gray-700">
              FULL NAME
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs tracking-wider mb-2 text-gray-700">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs tracking-wider mb-2 text-gray-700">
              PASSWORD
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs tracking-wider mb-2 text-gray-700">
              CONFIRM PASSWORD
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Re-enter your password"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs tracking-wider mb-2 text-gray-700">
              PHONE NUMBER
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="+82 10-1234-5678"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-xs tracking-wider mb-2 text-gray-700">
              ADDRESS
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors"
          >
            CREATE ACCOUNT
          </button>

          <p className="text-xs text-center text-gray-500 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
}
