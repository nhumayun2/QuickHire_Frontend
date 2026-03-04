"use client";

import { useState, useEffect } from "react";

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#D6DDEB] text-[#4640DE] bg-[#F8F8FD]">
      {children}
    </span>
  );
}

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        const data = await response.json();

        setJobs(data.slice(0, 8));
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
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <button className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-[#4640DE]">
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-[#7C8493]">
            Loading jobs from database...
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10 text-[#7C8493]">
            No jobs found. Create some in the admin panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {jobs.map((job) => (
              <article
                key={job._id}
                className="border border-[#E6E8F0] rounded-[16px] px-5 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#F8F8FD]" />
                  <Badge>Full Time</Badge>
                </div>
                <div className="space-y-1 mb-4">
                  <h3 className="text-[18px] font-semibold text-[#25324B]">
                    {job.title}
                  </h3>
                  <p className="text-sm text-[#7C8493]">
                    {job.company} · {job.location}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Badge>{job.category}</Badge>
                </div>
              </article>
            ))}
          </div>
        )}

        <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4640DE] lg:hidden">
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
