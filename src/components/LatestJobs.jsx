"use client";

import { useState, useEffect } from "react";

function Tag({ children, variant = "default" }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center";
  const variants = {
    default: "bg-[#F8F8FD] text-[#4640DE] border-transparent",
    outline: "bg-white text-[#4640DE] border-[#D6DDEB]",
    soft: "bg-[#FFF6E6] text-[#FFB836] border-transparent",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        const data = await response.json();

        // Reverse the array to show the newest jobs first, and slice the top 8
        setJobs(data.reverse().slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#25324B]">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <button className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-[#4640DE]">
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-[#7C8493]">
            Loading latest jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 text-[#7C8493]">
            No jobs available.
          </div>
        ) : (
          <>
            {/* Desktop layout: two columns of cards */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  className="flex items-center justify-between border border-[#E6E8F0] rounded-[16px] px-6 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)]"
                >
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#25324B] mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-[#7C8493] mb-4">
                      {job.company} · {job.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Tag variant="outline">Full-Time</Tag>
                      <Tag>{job.category}</Tag>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile layout: single column list */}
            <div className="space-y-4 lg:hidden">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  className="border border-[#E6E8F0] rounded-[16px] px-5 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)]"
                >
                  <h3 className="text-[18px] font-semibold text-[#25324B] mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-[#7C8493] mb-4">
                    {job.company} · {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="outline">Full-Time</Tag>
                    <Tag>{job.category}</Tag>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4640DE] lg:hidden">
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
