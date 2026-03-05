"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// Helper function to get initials for the avatar (e.g., "John Doe" -> "JD")
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

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          {/* Dashboard Header & Stats */}
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
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
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

            {/* Stat Card */}
            <div className="bg-white px-6 py-4 rounded-[16px] shadow-sm border border-[#E6E8F0] flex items-center gap-5 min-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#E6F6ED] flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#23C16B"
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
              <div>
                <p className="text-sm font-semibold text-[#7C8493] uppercase tracking-wider">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold text-[#25324B]">
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          {/* Table Card container */}
          <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6E8F0] overflow-hidden">
            {/* Table Header Area */}
            <div className="px-8 py-6 border-b border-[#E6E8F0] flex justify-between items-center bg-white">
              <h2 className="text-xl font-semibold text-[#25324B]">
                Recent Applications
              </h2>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-[#4640DE] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-[#7C8493] font-medium">
                    Loading applicant data...
                  </p>
                </div>
              ) : applications.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#F8F8FD] rounded-full flex items-center justify-center mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#A8ADB7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#25324B] mb-2">
                    No applications yet
                  </h3>
                  <p className="text-[#7C8493]">
                    When candidates apply, they will appear here.
                  </p>
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
                        {/* Candidate Column with Avatar */}
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E6F0FF] text-[#4640DE] flex items-center justify-center font-bold text-lg border border-[#D6DDEB]">
                              {getInitials(app.name)}
                            </div>
                            <div>
                              <p className="font-bold text-[#25324B] text-[16px]">
                                {app.name}
                              </p>
                              <p className="text-sm text-[#7C8493] mt-0.5 flex items-center gap-1.5">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                {app.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role Column */}
                        <td className="px-8 py-5">
                          {app.job_id ? (
                            <div>
                              <p className="font-semibold text-[#25324B] text-[16px]">
                                {app.job_id.title}
                              </p>
                              <p className="text-sm text-[#7C8493] mt-0.5 flex items-center gap-1.5">
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {app.job_id.company}
                              </p>
                            </div>
                          ) : (
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100">
                              Job Closed / Deleted
                            </span>
                          )}
                        </td>

                        {/* Date Column */}
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-[#515B6F] border border-gray-200">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              ></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            {new Date(app.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </td>

                        {/* Action Column */}
                        <td className="px-8 py-5 text-right">
                          <Link
                            href={app.resume_link}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#D6DDEB] text-[#4640DE] rounded-[8px] font-semibold hover:bg-[#F8F8FD] hover:border-[#4640DE] hover:shadow-sm transition-all shadow-sm"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            View Resume
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
