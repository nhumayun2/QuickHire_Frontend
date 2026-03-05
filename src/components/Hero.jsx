"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import localFont from "next/font/local";
import ScratchImage from "../../public/ventor_scratchs.png";
import HeroPerson from "../../public/hero_person.png";
import herobg from "../../public/hero_background_pattern.png";

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  display: "swap",
});

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (search.trim()) query.append("search", search.trim());
    if (location.trim()) query.append("location", location.trim());
    router.push(`/jobs?${query.toString()}`);
  };

  return (
    <section className="relative w-full h-screen bg-[#F8F9FF] flex justify-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[65%] h-full pointer-events-none z-0">
        <Image
          src={herobg}
          alt=""
          fill
          className="object-contain object-right-top opacity-60"
        />
      </div>

      <div className="relative z-10 w-[1440px] h-full px-[124px] flex items-center justify-between">
        <div className="relative z-20 w-[55%]">
          <h1
            className={`${clashDisplay.className} text-[72px] font-bold text-[#25324B] leading-[1.1] tracking-[-0.02em]`}
          >
            Discover <br /> more than <br />
            <span className="relative inline-block text-[#26A4FF]">
              5000+ Jobs
              <div className="absolute -bottom-4 left-0 w-full">
                <Image src={ScratchImage} alt="Scratch" />
              </div>
            </span>
          </h1>

          <p className="mt-8 text-lg text-[#515B6F] max-w-[480px] leading-relaxed font-medium">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          <div className="relative mt-10 bg-white p-2 rounded-[3px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] border border-[#E6E8F0] w-[830px]">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="flex-1 flex items-center gap-3 px-4 border-r border-[#D6DDEB]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A8ADB7"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full py-3 focus:outline-none text-[#25324B] placeholder:text-[#A8ADB7] font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 flex items-center gap-3 px-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A8ADB7"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input
                  type="text"
                  placeholder="Any Location"
                  className="w-full py-3 focus:outline-none text-[#25324B] placeholder:text-[#A8ADB7] font-medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="px-10 py-4 bg-[#4640DE] text-white font-bold rounded-[8px] hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Search my job
              </button>
            </form>
          </div>

          <div className="mt-6 text-sm">
            <span className="text-[#7C8493] font-medium">Popular : </span>
            <span className="text-[#25324B] font-bold">
              UI Designer, UX Researcher, Android, Admin
            </span>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-[50%] h-full flex items-end justify-end z-10 pointer-events-none">
          <div className="relative w-full h-[95%]">
            <Image
              src={HeroPerson}
              alt="Job seeker pointing"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
          <div
            className="absolute -bottom-[420px] -right-[250px] z-10 w-[450px] h-[800px] bg-white rotate-[58deg]"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  );
}
