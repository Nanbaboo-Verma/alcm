export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Back to{" "}
          <a href="./login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
