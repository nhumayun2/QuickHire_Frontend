"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchJobs();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/admin/myjobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this job? This action cannot be undone.",
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting job. Ensure you are logged in.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[100px] pb-12 px-6 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex gap-4 mb-8 border-b border-[#E6E8F0] pb-4">
            <Link
              href="/admin"
              className="text-[#7C8493] font-medium hover:text-[#4640DE] transition-colors"
            >
              Applications
            </Link>
            <Link
              href="/admin/jobs"
              className="text-[#4640DE] font-bold border-b-2 border-[#4640DE] pb-4 -mb-[17px]"
            >
              Manage Jobs
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-[32px] font-bold text-[#25324B]">
                Manage Jobs
              </h1>
              <p className="text-[#515B6F] mt-1">
                View, manage, and remove your active job postings.
              </p>
            </div>

            <Link
              href="/admin/jobs/create"
              className="inline-flex items-center gap-2 bg-[#4640DE] text-white px-6 py-3 rounded-[8px] font-semibold hover:opacity-90 transition-opacity"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Post New Job
            </Link>
          </div>

          <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center text-[#7C8493] font-medium">
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-16 text-center">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-2">
                    No active jobs
                  </h3>
                  <p className="text-[#7C8493]">
                    Click &quot;Post New Job&quot; to create your first listing.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F8FD] text-[#515B6F] text-sm uppercase tracking-wide">
                      <th className="px-8 py-4 font-semibold">Job Details</th>
                      <th className="px-8 py-4 font-semibold">Category</th>
                      <th className="px-8 py-4 font-semibold">Posted Date</th>
                      <th className="px-8 py-4 font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#25324B]">
                    {jobs.map((job) => (
                      <tr
                        key={job._id}
                        className="border-b border-gray-100 hover:bg-[#F8F8FD]/50 transition-colors"
                      >
                        <td className="px-8 py-5">
                          <p className="font-bold text-[#25324B] text-[16px]">
                            {job.title}
                          </p>
                          <p className="text-sm text-[#7C8493] mt-0.5">
                            {job.company} · {job.location}
                          </p>
                        </td>

                        <td className="px-8 py-5">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F0FF] text-[#4640DE]">
                            {job.category}
                          </span>
                        </td>

                        <td className="px-8 py-5 text-[#7C8493] text-sm font-medium">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-8 py-5 text-right space-x-3">
                          <Link
                            href={`/jobs/${job._id}`}
                            target="_blank"
                            className="text-[#515B6F] hover:text-[#26A4FF] font-medium text-sm transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
