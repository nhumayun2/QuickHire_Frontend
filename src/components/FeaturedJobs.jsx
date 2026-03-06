"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["600"],
});

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  display: "swap",
});

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#4640DE] text-[#4640DE] bg-white">
      {children}
    </span>
  );
}

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <section className="w-full bg-white flex justify-center">
      <div className="w-full max-w-[1440px] h-auto md:h-[779px] py-[40px] px-[16px] md:px-[124px] md:pt-[64px] md:pb-[72px] flex flex-col gap-[24px] md:gap-[48px] overflow-hidden">
        <div className="flex items-center justify-between">
          <h2
            className={`${clashDisplay.className} w-[220px] mb-8 md:mb-0 md:w-auto h-[38px] md:h-auto text-[32px] md:text-[48px] font-semibold text-[#25324B] leading-[1.2] md:leading-[1.1] tracking-[0%]`}
          >
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>

          <button
            onClick={() => router.push("/jobs")}
            className={`${epilogue.className} hidden lg:inline-flex items-center gap-2 text-[16px] leading-[1.6] font-semibold text-[#4640DE] hover:opacity-80 transition-opacity`}
          >
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="w-full md:w-[1192px] h-auto md:h-[606px]">
          {loading ? (
            <div className="text-center py-20 text-[#7C8493]">
              Loading jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-[#7C8493]">
              No jobs available.
            </div>
          ) : (
            <div className="flex md:grid md:grid-cols-4 gap-[16px] md:gap-[32px] overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  onClick={() => router.push(`/jobs/${job._id}`)}
                  className="cursor-pointer w-[286px] md:w-[274px] h-[283px] flex-shrink-0 snap-start border border-[#D6DDEB] p-[24px] bg-white flex flex-col justify-between hover:shadow-[0_24px_80px_rgba(0,0,0,0.05)] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-sm flex-shrink-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7C8493"
                        strokeWidth="2"
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
                    <Badge>Full Time</Badge>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="text-[18px] font-bold text-[#25324B] group-hover:text-[#4640DE] transition-colors leading-tight line-clamp-2">
                      {job.title}
                    </h3>
                    <p className="text-[16px] text-[#7C8493] font-medium line-clamp-1">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 overflow-hidden h-[34px]">
                    <span className="px-3 py-1 bg-[#56CDAD]/10 text-[#56CDAD] rounded-full text-[12px] font-bold whitespace-nowrap">
                      {job.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => router.push("/jobs")}
          className={`${epilogue.className} lg:hidden flex items-center justify-center gap-[16px] w-[144px] h-[26px] mx-auto mt-2 text-[#4640DE] font-semibold text-[16px] hover:opacity-80 transition-opacity`}
        >
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
