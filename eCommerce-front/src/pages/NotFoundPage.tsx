import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-9xl font-light text-gray-200 mb-8">404</h1>
        <h2 className="text-2xl font-light tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-12">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-gray-900 transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
