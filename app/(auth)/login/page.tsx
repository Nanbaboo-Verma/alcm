import LoginForm from "@/app/_components/LoginForm";
import Card from "@/app/_components/ui/Card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card>
      {/* <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link
              href="./forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form> */}
      <LoginForm />

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </Card>
  );
}
