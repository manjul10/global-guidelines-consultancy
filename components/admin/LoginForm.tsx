"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("admin@globalguidelines.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please verify credentials.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-md p-1.5 mx-auto border border-slate-100 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Global Guidelines Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-black text-brand-navy tracking-wide">
            GLOBAL GUIDELINES
          </h1>
          <p className="text-[11px] font-bold text-brand-red uppercase tracking-wider">
            CMS Studio Portal
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Sign in with authorized administrator or editor credentials.
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-brand-red p-3 rounded-xl text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@globalguidelines.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-brand-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600">
          <strong>Default Demo Login:</strong>
          <br />
          Email: <code className="text-brand-navy font-semibold">admin@globalguidelines.com</code>
          <br />
          Password: <code className="text-brand-navy font-semibold">admin123</code>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center space-x-2 bg-brand-red hover:bg-brand-red-600 text-white font-bold py-3 rounded-xl transition shadow text-xs tracking-wide disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to CMS Dashboard</span>
          )}
        </button>
      </form>
    </div>
  );
}
