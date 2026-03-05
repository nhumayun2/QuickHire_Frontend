"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase();
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        );
        if (!response.ok) throw new Error("Failed to fetch applications");

        const data = await response.json();
        setApplications(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex gap-4 mb-8 border-b border-[#E6E8F0] pb-4">
            <Link
              href="/admin"
              className="text-[#4640DE] font-bold border-b-2 border-[#4640DE] pb-4 -mb-[17px]"
            >
              Applications
            </Link>
            <Link
              href="/admin/jobs"
              className="text-[#7C8493] font-medium hover:text-[#4640DE] transition-colors"
            >
              Manage Jobs
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#E6F0FF] rounded-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4640DE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h1 className="text-[32px] font-bold text-[#25324B]">
                  Candidate Pipeline
                </h1>
              </div>
              <p className="text-[#515B6F] text-lg">
                Review and manage incoming job applications.
              </p>
            </div>

            <div className="bg-white px-6 py-4 rounded-[16px] shadow-sm border border-[#E6E8F0] flex items-center gap-5 min-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#E6F6ED] flex items-center justify-center">
                <span className="text-[#23C16B] font-bold text-xl">
                  {applications.length}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#7C8493] uppercase tracking-wider">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold text-[#25324B]">Recent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center text-[#7C8493]">
                  Loading data...
                </div>
              ) : applications.length === 0 ? (
                <div className="p-16 text-center text-[#7C8493]">
                  No applications received yet.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F8FD] text-[#515B6F] text-sm uppercase tracking-wide">
                      <th className="px-8 py-4 font-semibold">Candidate</th>
                      <th className="px-8 py-4 font-semibold">Applied Role</th>
                      <th className="px-8 py-4 font-semibold">Date Applied</th>
                      <th className="px-8 py-4 font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#25324B]">
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-gray-100 hover:bg-[#F8F8FD]/50 transition-colors group"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E6F0FF] text-[#4640DE] flex items-center justify-center font-bold text-sm">
                              {getInitials(app.name)}
                            </div>
                            <div>
                              <p className="font-bold text-[#25324B]">
                                {app.name}
                              </p>
                              <p className="text-xs text-[#7C8493]">
                                {app.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="font-semibold text-[#25324B]">
                            {app.job_id?.title || "Position Deleted"}
                          </p>
                          <p className="text-xs text-[#7C8493]">
                            {app.job_id?.company}
                          </p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm text-[#7C8493] bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <Link
                            href={app.resume_link}
                            target="_blank"
                            className="text-[#4640DE] font-semibold text-sm hover:underline"
                          >
                            View Resume ↗
                          </Link>
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
