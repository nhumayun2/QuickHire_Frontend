"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-[#F8F8FD] py-12 px-6">
        <div className="bg-white border border-[#E6E8F0] rounded-[16px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.03)] w-full max-w-[480px]">
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-bold text-[#25324B] mb-2">
              Create an Account
            </h1>
            <p className="text-[#7C8493]">
              Sign up for an admin account to manage job postings.
            </p>
          </div>

          {success ? (
            <div className="bg-[#E6F6ED] border border-[#23C16B] text-[#14804A] p-6 rounded-[8px] text-center">
              <h3 className="font-bold text-lg mb-1">
                Registration Successful!
              </h3>
              <p className="text-sm">Redirecting you to the login page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7]"
                  placeholder="Create a strong password"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-[8px] text-sm font-medium text-center border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[8px] bg-[#4640DE] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          )}

          <p className="text-center text-[#7C8493] text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4640DE] font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
