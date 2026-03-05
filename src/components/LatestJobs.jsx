"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

import rightTop from "../../public/latestjobshapes/rightTop.png";
import rightMiddle from "../../public/latestjobshapes/rightMiddle.png";
import bottomShape from "../../public/latestjobshapes/bottom.png";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  display: "swap",
});

function Tag({ children, variant = "default" }) {
  const base =
    "px-4 py-1.5 rounded-full text-[14px] font-semibold border inline-flex items-center justify-center";

  const variants = {
    default: "bg-[#56CDAD]/10 text-[#56CDAD] border-transparent",
    outline: "bg-white text-[#FFB836] border-[#FFB836]",
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
        setJobs(data.slice().reverse().slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="relative w-full h-[877px] bg-white flex justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[#F8F8FD] z-0"
        style={{
          clipPath: "polygon(140px 0, 100% 0, 100% 100%, 0 100%, 0 140px)",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1440px] h-full z-10 pointer-events-none">
        <div
          className="absolute"
          style={{
            width: "192.20022774311641px",
            height: "416.4660991159406px",
            top: "-160.25px",
            right: "135.44px",
            scale: "2",
            opacity: 0.6,
          }}
        >
          <Image src={rightTop} alt="" fill className="object-contain" />
        </div>

        <div
          className="absolute"
          style={{
            width: "319.77695020433987px",
            height: "778.5056229831226px",
            top: "80px",
            right: "-150.95px",
            opacity: 1,
            scale: "1.5",
          }}
        >
          <Image src={rightMiddle} alt="" fill className="object-contain" />
        </div>

        <div
          className="absolute"
          style={{
            width: "283.38406654132706px",
            height: "716.2515940431733px",
            top: "500px",
            right: "320px",
            opacity: 1,
            scale: "2",
          }}
        >
          <Image src={bottomShape} alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-20 w-[1440px] h-full px-[124px] py-16 flex flex-col">
        <div className="flex items-center justify-between mb-[48px] mt-10">
          <h2
            className={`${clashDisplay.className} text-[48px] font-semibold text-[#25324B] leading-[1.1]`}
          >
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>

          <button
            className={`${epilogue.className} hidden lg:inline-flex items-center gap-2 text-[16px] leading-[1.6] font-semibold text-[#4640DE] hover:opacity-80 transition-opacity`}
          >
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="w-[1192px] h-[644px]">
          {loading ? (
            <div className="text-center py-20 text-[#7C8493]">
              Searching for latest opportunities...
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 text-[#7C8493]">
              No jobs found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-[32px] gap-y-[16px]">
              {jobs.map((job) => (
                <article
                  key={job._id}
                  style={{ width: "580px", height: "149px" }}
                  className="flex items-center border border-[#D6DDEB] bg-white pt-[24px] pb-[24px] px-[40px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all group"
                >
                  <div className="mr-[24px] flex-shrink-0 w-12 h-12 bg-gray-100 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7C8493"
                      strokeWidth="2"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-[8px] w-[268px]">
                    <div className="flex flex-col gap-[4px]">
                      <h3 className="text-[20px] font-bold text-[#25324B] group-hover:text-[#4640DE] transition-colors leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-[16px] text-[#7C8493] font-normal">
                        {job.company} • {job.location}
                      </p>
                    </div>

                    <div className="flex gap-[8px] h-[34px] items-center">
                      <Tag variant="default">{job.category}</Tag>
                      <div className="h-6 w-[1px] bg-[#D6DDEB]" />
                      <Tag variant="outline">Full-Time</Tag>
                    </div>
                  </div>

                  <button className="ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-[#F8F8FD] text-[#4640DE] hover:bg-[#4640DE] hover:text-white transition-colors">
                    <span aria-hidden>→</span>
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>

        <button
          className={`${epilogue.className} lg:hidden mt-8 w-full py-4 bg-[#4640DE] text-white font-semibold rounded-[4px]`}
        >
          Show all jobs →
        </button>
      </div>
    </section>
  );
}
