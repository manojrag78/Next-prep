"use client";

import React, { useState } from "react";
import Link from "next/link";
import DynamicForm from "@/app/lib/Form/_components/DynamicForm";
import { signUpFormConfig, SignupFormValues } from "../config/signUpConfig";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: SignupFormValues) => {
    console.log("Form submitted ✅", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-1/2 flex items-center justify-center px-4">
      <div className="w-full  bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your details to sign up and get started
          </p>
        </div>

        <DynamicForm
          submitButtonText={isLoading ? "Signing up..." : "Sign Up"}
          formConfig={signUpFormConfig}
          onSubmit={handleSubmit}
          loading={isLoading}
        />

        <div className="text-sm text-center text-blue-600 space-y-1">
      
          <span className="text-gray-500">
            Already have an account? 
            <Link href="/sign-in" className="text-blue-600 hover:underline pl-1">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
