"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn, tokens } from "@/lib/theme";
import { login, saveToken, verifyToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const auth = await login(username.trim(), password);
      saveToken(auth.access_token);
      // Optional: verify token; ignore failures for now
      try { await verifyToken(auth.access_token); } catch {}
      router.push("/profile");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(tokens.bg.gradient, "min-h-screen flex items-center justify-center p-4")}> 
      <div className={cn(tokens.surface.card, "w-full max-w-md p-8")}> 
        <h1 className={cn(tokens.heading, "text-3xl mb-2 text-center")}>
          Welcome back
        </h1>
        <p className="text-white/70 text-center mb-8">Log in to your VerdictAI account</p>

        {error && (
          <div className="mb-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0e1a22]/80 border border-[rgba(200,171,127,0.25)] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)]"
              placeholder="your-username"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0e1a22]/80 border border-[rgba(200,171,127,0.25)] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)]"
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-white/70 mt-6">
          Don&apos;t have an account? {" "}
          <Link href="/signup" className="text-[var(--primary-gold)] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
} 