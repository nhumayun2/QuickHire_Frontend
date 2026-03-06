"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function JobsList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  // Local state for the filter form inputs
  const [searchInput, setSearchInput] = useState(search);
  const [locationInput, setLocationInput] = useState(location);
  const [categoryInput, setCategoryInput] = useState(category);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (location) query.append("location", location);
        if (category) query.append("category", category);

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
  }, [search, location, category]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchInput.trim()) query.append("search", searchInput.trim());
    if (locationInput.trim()) query.append("location", locationInput.trim());
    if (categoryInput) query.append("category", categoryInput);

    router.push(`/jobs?${query.toString()}`);
  };

  const clearFilters = () => {
    setSearchInput("");
    setLocationInput("");
    setCategoryInput("");
    router.push("/jobs");
  };

  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-12 text-left min-h-[50vh]">
      <div className="mb-10 text-left">
        <h1 className="text-[32px] font-semibold text-[#25324B]">
          Find your <span className="text-[#26A4FF]">dream job</span>
        </h1>
        <p className="text-[#515B6F] mt-2 font-medium">
          Explore our latest opportunities and find the perfect fit.
        </p>
      </div>

      {/* Filter UI Section - Fixed Layout */}
      <div className="bg-white p-6 md:p-8 rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6E8F0] mb-12">
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col md:flex-row items-end gap-5 text-left"
        >
          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold text-[#25324B] mb-2">
              Job Title or Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-3 h-[50px] rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7] text-left"
            />
          </div>

          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold text-[#25324B] mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full px-4 py-3 h-[50px] rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] placeholder:text-[#A8ADB7] text-left"
            />
          </div>

          <div className="w-full md:flex-1">
            <label className="block text-sm font-semibold text-[#25324B] mb-2">
              Category
            </label>
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full px-4 py-3 h-[50px] rounded-[8px] border border-[#D6DDEB] focus:outline-none focus:border-[#4640DE] text-[#25324B] bg-white appearance-none text-left"
            >
              <option value="">All Categories</option>
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

          <div className="w-full md:w-auto flex gap-3 h-[50px]">
            <button
              type="submit"
              className="flex-1 md:flex-none px-8 h-full bg-[#4640DE] text-white font-semibold rounded-[8px] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center"
            >
              Filter Jobs
            </button>
            {(search || location || category) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 h-full border border-[#D6DDEB] text-[#515B6F] font-semibold rounded-[8px] hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Job Listings */}
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
              className="border border-[#E6E8F0] rounded-[16px] px-6 py-6 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)] hover:border-[#4640DE] transition-colors flex flex-col text-left"
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

              <button
                onClick={() => router.push(`/jobs/${job._id}`)}
                className="w-full py-3 rounded-[8px] bg-white border border-[#4640DE] text-[#4640DE] font-semibold hover:bg-[#4640DE] hover:text-white transition-colors cursor-pointer text-center"
              >
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
      {/* pt-[78px] fixes the absolute Navbar overlap */}
      <main className="flex-grow bg-[#F8F8FD] border-t border-gray-100 pt-[78px]">
        <Suspense
          fallback={
            <div className="text-center py-20 text-[#7C8493]">
              Loading jobs board...
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
