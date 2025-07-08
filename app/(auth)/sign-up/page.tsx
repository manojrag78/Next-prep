"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import router
import DynamicForm from "@/app/lib/Form/_components/DynamicForm";
import { signUpFormConfig, SignupFormValues } from "../config/signUpConfig";
import axios from "axios";
import { setSessionToken } from "../config/sessionToken";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize router

  const handleSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      const url = process.env.NEXT_PUBLIC_BACK_END_URL
      const response = await axios.post(`${url}/api/auth/register`, data);

      const { token, user } = response.data;

      if (token && user) {
        setSessionToken(token)
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/chat");
      } else {
        setError("Invalid response from server");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-1/2 flex items-center justify-center px-4">
      <div className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your details to sign up and get started
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <DynamicForm
          submitButtonText={isLoading ? "Signing up..." : "Sign Up"}
          formConfig={signUpFormConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />

        <div className="text-sm text-center text-blue-600 space-y-1">
          <span className="text-gray-500">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-blue-600 hover:underline pl-1"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
