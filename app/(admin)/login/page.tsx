import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-800 text-center text-xs text-slate-500 animate-pulse">
            Loading login portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
