"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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
        <div className="mx-auto max-w-[1120px]">
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

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-bold text-[#25324B]">
                Admin Dashboard
              </h1>
              <p className="text-[#7C8493] mt-1">
                Review all recent job applications
              </p>
            </div>
            <div className="bg-[#4640DE] text-white px-4 py-2 rounded-[8px] font-semibold">
              Total: {applications.length}
            </div>
          </div>

          <div className="bg-white border border-[#E6E8F0] rounded-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-10 text-center text-[#7C8493]">
                  Loading applications...
                </div>
              ) : applications.length === 0 ? (
                <div className="p-10 text-center text-[#7C8493]">
                  No applications received yet.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F8FD] border-b border-[#E6E8F0] text-[#515B6F] text-sm">
                      <th className="px-6 py-4 font-semibold">
                        Candidate Name
                      </th>
                      <th className="px-6 py-4 font-semibold">Applied Role</th>
                      <th className="px-6 py-4 font-semibold">Contact Email</th>
                      <th className="px-6 py-4 font-semibold">
                        Resume / Portfolio
                      </th>
                      <th className="px-6 py-4 font-semibold">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-[#25324B]">
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-[#E6E8F0] hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{app.name}</td>
                        <td className="px-6 py-4 font-semibold text-[#4640DE]">
                          {app.job_id?.title || "Position Deleted"}
                        </td>
                        <td className="px-6 py-4">{app.email}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={app.resume_link}
                            target="_blank"
                            className="text-[#26A4FF] hover:underline font-medium"
                          >
                            View Link ↗
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-[#7C8493]">
                          {new Date(app.createdAt).toLocaleDateString()}
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
