import { Link } from "react-router";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-tight mb-3">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">
            New to HYAN?{" "}
            <Link to="/signup" className="underline hover:text-black">
              Create an account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs tracking-wider mb-2 text-gray-700">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-gray-600 hover:text-black underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
