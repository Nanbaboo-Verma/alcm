import { LoginForm } from "@/features/auth";
import Card from "@/app/_components/ui/Card";

export const metadata = {
  title: "Login - ALCM Modern Public School",
  description:
    "Sign in to access your student, teacher, or administrator portal",
};

export default function LoginPage() {
  return (
    <Card>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          ALCM School Portal
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Role-Based Access for Students, Teachers & Administrators
        </p>
      </div>

      <LoginForm />
    </Card>
  );
}
