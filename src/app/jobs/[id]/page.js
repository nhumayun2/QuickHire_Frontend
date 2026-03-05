"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
        );

        if (!response.ok) {
          throw new Error("Job not found");
        }

        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(true);
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[#F8F8FD]">
          <p className="text-[#7C8493] text-lg font-medium">
            Loading job details...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center bg-[#F8F8FD]">
          <h2 className="text-2xl font-bold text-[#25324B] mb-2">
            Job Not Found
          </h2>
          <p className="text-[#7C8493] mb-6">
            The job you are looking for doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="px-6 py-3 bg-[#4640DE] text-white rounded-[8px] font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Jobs
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow bg-[#F8F8FD] py-12 lg:py-20 border-t border-gray-100">
        <div className="mx-auto max-w-[800px] px-6 lg:px-0">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors"
          >
            <span aria-hidden>←</span> Back
          </button>
          <div className="bg-white border border-[#E6E8F0] rounded-[16px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.03)] mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div>
                <h1 className="text-[32px] font-bold text-[#25324B] leading-tight mb-2">
                  {job.title}
                </h1>
                <p className="text-lg text-[#515B6F] mb-6">
                  {job.company} · {job.location}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#F8F8FD] text-[#4640DE]">
                    Full-Time
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold border border-[#D6DDEB] text-[#515B6F]">
                    {job.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push(`/jobs/${job._id}/apply`)}
                className="w-full lg:w-auto px-8 py-4 bg-[#4640DE] text-white rounded-[8px] font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
          <div className="bg-white border border-[#E6E8F0] rounded-[16px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.03)]">
            <h3 className="text-[24px] font-bold text-[#25324B] mb-4">
              Job Description
            </h3>
            <div className="prose max-w-none text-[#515B6F] leading-relaxed">
              <p className="whitespace-pre-wrap">{job.description}</p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h4 className="text-[20px] font-semibold text-[#25324B] mt-8 mb-4">
                    Responsibilities
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h4 className="text-[20px] font-semibold text-[#25324B] mt-8 mb-4">
                    Requirements
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
