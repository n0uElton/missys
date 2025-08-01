"use client";

import React, { useState, useCallback } from "react";
import { supabase } from "@/supabaseClient";

// Define a more specific type for the form data
interface AuthFormState {
  email: string;
  password: string;
  name?: string;
  role?: "SA" | "HR" | "Finance" | "User";
}

// Define the component using React.FC with an empty object for props
const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormState>({
    email: "",
    password: "",
    name: "",
    role: "User",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Use useCallback for memoizing event handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

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

        setMessage("Login successful. Redirecting you to your dashboard...");
      } else {
        // Registration logic
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: "http://localhost:3000/auth/callback",
            data: {
              name: formData.name,
              role: formData.role,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (!data.user) {
          setError("User creation failed. Please ensure all fields are valid.");
          return;
        }

        // Handle case where user already exists but is unconfirmed
        if (data.user.identities?.length === 0) {
          const { error: resendError } = await supabase.auth.resend({
            type: "signup",
            email: formData.email,
            options: { emailRedirectTo: "http://localhost:3000/auth/callback" },
          });

          if (resendError) {
            setError(resendError.message);
            return;
          }
          setMessage(
            "A confirmation email has been resent. Please check your inbox."
          );
          return;
        }

        setMessage(
          "Registration successful! Please check your email to confirm your account."
        );
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", name: "", role: "User" });
    setError(null);
    setMessage(null);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            ADON SYSTEM
          </h1>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Welcome back!" : "Join us and get started."}
          </p>
        </div>

        {error && (
          <div
            className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center"
            role="alert"
          >
            <span className="font-medium">Error:</span> {error}
          </div>
        )}
        {message && (
          <div
            className="mt-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm text-center"
            role="alert"
          >
            <span className="font-medium">Success:</span> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="SA">Super Admin</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email-address"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                name="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "New to ADON SYSTEM?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
