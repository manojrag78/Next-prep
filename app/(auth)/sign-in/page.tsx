"use client";
import React, { useState } from "react";
import Link from "next/link";
import { gridFormConfig, GridFormValues } from "../config/sign-in-config";
import DynamicForm from "@/app/lib/Form/_components/DynamicForm";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (data: GridFormValues) => {
    console.log("Form submitted ✅", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate a successful login
      alert("Login successful!");
      // Redirect to the dashboard or home page
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">
            Please sign in to your account
          </p>
        </div>
        <DynamicForm
          submitButtonText="Login"
          formConfig={gridFormConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
        <div className="flex flex-col items-center space-y-2 text-sm text-blue-600">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link href="/sign-up" className="hover:underline">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
