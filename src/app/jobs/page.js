"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (location) query.append("location", location);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs?${query.toString()}`,
        );
        const data = await response.json();

        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
        setLoading(false);
      }
    };

    fetchFilteredJobs();
  }, [search, location]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-16 min-h-[50vh]">
      <div className="mb-10">
        <h1 className="text-[32px] font-semibold text-[#25324B]">
          Find your <span className="text-[#26A4FF]">dream job</span>
        </h1>
        {(search || location) && (
          <p className="text-[#515B6F] mt-2 font-medium">
            Showing results for {search ? `"${search}"` : "all jobs"}{" "}
            {location ? `in ${location}` : ""}
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#7C8493] font-medium">
          Searching database...
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E6E8F0] rounded-[16px]">
          <p className="text-[#25324B] font-semibold text-lg mb-2">
            No jobs found
          </p>
          <p className="text-[#7C8493]">
            Try adjusting your search keywords or location.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <article
              key={job._id}
              className="border border-[#E6E8F0] rounded-[16px] px-6 py-6 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)] hover:border-[#4640DE] transition-colors flex flex-col"
            >
              <div className="flex-grow">
                <h3 className="text-[20px] font-semibold text-[#25324B] mb-2">
                  {job.title}
                </h3>
                <p className="text-base text-[#7C8493] mb-4">
                  {job.company} · {job.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F8F8FD] text-[#4640DE]">
                    Full-Time
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#D6DDEB] text-[#515B6F]">
                    {job.category}
                  </span>
                </div>
              </div>

              <button className="w-full py-3 rounded-[8px] bg-white border border-[#4640DE] text-[#4640DE] font-semibold hover:bg-[#4640DE] hover:text-white transition-colors">
                Apply Now
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[#F8F8FD] border-t border-gray-100">
        <Suspense
          fallback={
            <div className="text-center py-20 text-[#7C8493]">
              Loading application...
            </div>
          }
        >
          <JobsList />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
