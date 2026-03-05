"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
        );
        if (!response.ok) throw new Error("Job not found");
        const data = await response.json();
        setJob(data);
        setLoadingJob(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoadingJob(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_id: id,
            ...formData,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to submit application");

      setSubmitStatus("success");
      setIsSubmitting(false);

      setTimeout(() => {
        router.push("/jobs");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[#F8F8FD]">
          <p className="text-[#7C8493] text-lg font-medium">
            Loading application form...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow bg-[#F8F8FD] py-12 border-t border-gray-100">
        <div className="mx-auto max-w-[600px] px-6 lg:px-0">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-[#515B6F] font-medium hover:text-[#4640DE] transition-colors"
          >
            <span aria-hidden>←</span> Back to Job Details
          </button>

          <div className="bg-white border border-[#E6E8F0] rounded-[16px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.03)]">
            <h1 className="text-[28px] font-bold text-[#25324B] mb-2">
              Submit Application
            </h1>
            <p className="text-[#7C8493] mb-8">
              Applying for{" "}
              <span className="font-semibold text-[#25324B]">{job?.title}</span>{" "}
              at {job?.company}
            </p>

            {submitStatus === "success" ? (
              <div className="bg-[#E6F6ED] border border-[#23C16B] text-[#14804A] p-6 rounded-[8px] text-center">
                <h3 className="font-bold text-xl mb-2">
                  Application Submitted!
                </h3>
                <p>
                  Thank you for applying. We will review your application and
                  get back to you soon.
                </p>
                <p className="text-sm mt-4 opacity-80">
                  Redirecting to jobs board...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
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
                    Email Address <span className="text-red-500">*</span>
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
                    htmlFor="resume_link"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Resume Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="resume_link"
                    name="resume_link"
                    required
                    value={formData.resume_link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7]"
                    placeholder="https://yourportfolio.com or Google Drive link"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cover_note"
                    className="block text-sm font-semibold text-[#25324B] mb-2"
                  >
                    Cover Note
                  </label>
                  <textarea
                    id="cover_note"
                    name="cover_note"
                    rows="5"
                    value={formData.cover_note}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7] resize-y"
                    placeholder="Tell us why you are a great fit for this role..."
                  ></textarea>
                </div>
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm font-medium">
                    Something went wrong. Please check your links and try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[8px] bg-[#4640DE] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
