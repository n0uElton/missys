"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";

interface AuthFormState {
  email: string;
  password: string;
  full_name?: string;
  role?: "Admin" | "HR" | "Finance" | "User";
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormState>({
    email: "",
    password: "",
    full_name: "",
    role: "User",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", full_name: "", role: "User" });
    setError(null);
    setMessage(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (loginError) {
          setError(loginError.message);
          return;
        }

        setMessage("Login successful. Redirecting...");
        router.push("/dashboard");
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: "http://localhost:3000/auth/callback",
            data: {
              full_name: formData.full_name,
              role: formData.role,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (data.user?.identities?.length === 0) {
          const { error: resendError } = await supabase.auth.resend({
            type: "signup",
            email: formData.email,
            options: {
              emailRedirectTo: "http://localhost:3000/auth/callback",
            },
          });

          if (resendError) {
            setError(resendError.message);
            return;
          }

          setMessage("A confirmation email has been resent.");
          return;
        }

        setMessage("Registration successful! Please check your email.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Login"
              : "Sign up using your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {!isLogin && (
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="border rounded px-3 py-2"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {message && (
                <div className="text-green-600 text-sm">{message}</div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Registering..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </Button>
              <div className="text-center text-sm">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="underline underline-offset-4"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
