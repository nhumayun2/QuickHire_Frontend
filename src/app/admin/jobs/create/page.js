"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "Design",
    description: "",
    responsibilities: "",
    requirements: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const responsibilitiesArray = formData.responsibilities
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const requirementsArray = formData.requirements
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const payload = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      category: formData.category,
      description: formData.description,
      responsibilities: responsibilitiesArray,
      requirements: requirementsArray,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }
      router.push("/admin/jobs");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6 lg:px-12">
        <div className="mx-auto max-w-[800px]">
          <Link
            href="/admin/jobs"
            className="mb-6 inline-flex items-center gap-2 text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors"
          >
            <span aria-hidden>←</span> Back to Manage Jobs
          </Link>

          <div className="bg-white border border-[#E6E8F0] rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-[28px] font-bold text-[#25324B] mb-2">
              Post a New Job
            </h1>
            <p className="text-[#7C8493] mb-8">
              Fill out the details below to publish a new open role.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B]"
                    placeholder="e.g. Senior Product Designer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B]"
                    placeholder="e.g. Qtec Solution Limited"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B]"
                    placeholder="e.g. Dhaka, Bangladesh"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] bg-white appearance-none"
                  >
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Technology">Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Human Resource">Human Resource</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Full Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] resize-y"
                  placeholder="Describe the role, the team, and what the candidate will be doing..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="responsibilities"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Responsibilities (One per line)
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows="3"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] resize-y"
                  placeholder="Design user interfaces...&#10;Collaborate with developers...&#10;Conduct user research..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="block text-sm font-semibold text-[#25324B] mb-2"
                >
                  Requirements (One per line)
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows="3"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] resize-y"
                  placeholder="3+ years of experience...&#10;Proficient in Figma...&#10;Excellent communication skills..."
                ></textarea>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-[8px] text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <div className="pt-4 border-t border-[#E6E8F0] flex justify-end gap-4">
                <Link
                  href="/admin/jobs"
                  className="px-6 py-3 rounded-[8px] text-[#515B6F] font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-[8px] bg-[#4640DE] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? "Publishing..." : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
