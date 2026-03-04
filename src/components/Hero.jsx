import Image from "next/image";
import scratches from "../../public/ventor_scratchs.png";
import pattern from "../../public/hero_background_pattern.png";
import HeroPerson from "../../public/hero_person.png";

export default function Hero() {
  return (
    <section className="bg-[#F8F8FD] w-full overflow-hidden">
      {/* 1440px Master Container matched to Figma's exact dimensions */}
      <div className="relative mx-auto max-w-[1440px] h-auto lg:h-[794px] flex flex-col lg:block">
        {/* --- RIGHT SIDE: EXACT FIGMA COORDINATES --- */}
        <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* 1. Background Pattern (z-0) */}
          <Image
            src={pattern}
            alt="Background pattern"
            className="absolute z-0"
            style={{
              left: "580px",
              top: "0px",
              width: "860px",
              height: "794px",
              objectFit: "cover",
            }}
            priority
          />

          {/* 2. Person Image (z-10) */}
          <Image
            src={HeroPerson}
            alt="Happy man pointing at jobs"
            className="absolute z-10"
            style={{
              left: "812px",
              top: "87px",
              width: "501px",
              height: "707px",
              objectFit: "contain",
            }}
            priority
          />

          {/* 3. White Angled Shape (z-20) */}
          <div
            className="absolute bg-white z-20"
            style={{
              width: "283.38px",
              height: "716.25px",
              left: "882px",
              top: "555px",
              transform: "rotate(-64deg)",
            }}
          ></div>
        </div>

        {/* --- LEFT SIDE: EXACT FIGMA COORDINATES --- */}
        <div className="relative z-30 px-6 pt-16 pb-24 lg:p-0 lg:absolute lg:left-[124px] lg:top-[82px] w-full lg:w-auto flex flex-col">
          <h1
            className="text-[48px] lg:text-[72px] font-semibold text-[#25324B] leading-[1.1] tracking-tight w-full lg:w-[533px]"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Discover <br className="hidden lg:block" />
            more than <br className="hidden lg:block" />
            <span className="text-[#26A4FF] relative inline-block">
              5000+ Jobs
              {/* The Blue Scratches Vector */}
              <Image
                src={scratches}
                alt="Decorative scratches"
                className="absolute -bottom-[20px] left-0 w-full object-contain pointer-events-none"
              />
            </span>
          </h1>

          <p className="text-[#515B6F] text-[18px] lg:text-[20px] leading-[1.6] max-w-[520px] mt-6 mb-10 font-medium font-['Epilogue']">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Bar - explicitly sized to 852x89 so it overlaps the person image */}
          <div
            className="bg-white p-[16px] flex flex-col lg:flex-row items-center w-full max-w-[852px] lg:w-[852px] lg:h-[89px]"
            style={{
              boxShadow:
                "0px 2.71px 4.4px 0px #C0C0C007, 0px 6.86px 11.12px 0px #C0C0C00A, 0px 14px 22.68px 0px #C0C0C00C, 0px 28.84px 46.72px 0px #C0C0C00F, 0px 79px 128px 0px #C0C0C017",
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 flex-1 w-full px-4 border-b lg:border-b-0 lg:border-r border-gray-200 h-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#25324B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none text-[#25324B] placeholder:text-[#A8ADB7] text-[16px] font-['Epilogue']"
              />
            </div>

            {/* Location Select */}
            <div className="flex items-center gap-3 flex-1 w-full px-4 mt-4 lg:mt-0 h-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#25324B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <select className="w-full outline-none text-[#25324B] appearance-none cursor-pointer bg-transparent text-[16px] font-['Epilogue']">
                <option>Florence, Italy</option>
                <option>Dhaka, Bangladesh</option>
                <option>New York, USA</option>
              </select>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#25324B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto pointer-events-none"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Search Button */}
            <button className="bg-[#4640DE] hover:opacity-90 transition-opacity text-white font-medium text-[16px] px-[32px] py-[14px] w-full lg:w-auto mt-4 lg:mt-0 h-full font-['Epilogue']">
              Search my job
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 text-[16px] text-[#515B6F] leading-[1.6] font-['Epilogue']">
            <span className="font-medium text-[#25324B]">Popular : </span> UI
            Designer, UX Researcher, Android, Admin
          </div>
        </div>

        {/* Mobile Image Fallback (Standard flow for small screens) */}
        <div className="block lg:hidden w-full relative h-[450px] mt-8 overflow-hidden pointer-events-none">
          <Image
            src={pattern}
            alt="Background pattern lines"
            className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
          />
          <Image
            src={HeroPerson}
            alt="Happy man pointing at jobs"
            className="absolute bottom-0 right-0 w-[85%] h-auto object-contain z-10"
            priority
          />
        </div>
      </div>
    </section>
  );
}
