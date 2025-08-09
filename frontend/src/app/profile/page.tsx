"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn, tokens } from "@/lib/theme";
import { clearToken, getToken } from "@/lib/api";
import { decodeJwt, getCurrentUser, isTokenExpired } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.replace("/login");
      return;
    }
    if (isTokenExpired(t)) {
      clearToken();
      router.replace("/login");
      return;
    }
    setToken(t);
  }, [router]);

  const user = useMemo(() => (token ? getCurrentUser() : null), [token]);

  if (!token || !user) {
    return null;
  }

  const payload = decodeJwt(token) || {};

  return (
    <div className={cn(tokens.bg.gradient, "min-h-screen py-12")}> 
      <div className={cn(tokens.container)}>
        <h1 className={cn(tokens.heading, "text-4xl mb-6")}>
          Your Profile
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-3 text-white/80">
              <div>
                <span className="text-white/60">Username:</span>
                <span className="ml-2">{user.username}</span>
              </div>
              {user.expiresAtMs && (
                <div>
                  <span className="text-white/60">Token Expires:</span>
                  <span className="ml-2">{new Date(user.expiresAtMs).toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
              >
                Back Home
              </Button>
              <Button
                onClick={() => {
                  clearToken();
                  router.replace("/");
                }}
              >
                Log out
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Token Payload</h2>
            <pre className="text-sm bg-black/30 p-3 rounded-lg overflow-auto">
{JSON.stringify(payload, null, 2)}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
} 