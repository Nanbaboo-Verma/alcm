import { RegisterForm } from "@/features/auth";
import Card from "@/app/_components/ui/Card";

export const metadata = {
  title: "Register - ALCM Modern Public School",
  description: "Create your student, teacher, or admin account at ALCM",
};

export default function SignupPage() {
  return (
    <Card>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
        <p className="text-xs text-slate-500 mt-1">
          Join ALCM Modern Public School Portal
        </p>
      </div>

      <RegisterForm />
    </Card>
  );
}
