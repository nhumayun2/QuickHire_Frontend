"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["600"],
});

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Extralight.otf",
  display: "swap",
});

const categories = [
  {
    name: "Design",
    count: "235 jobs available",
    icon: "/Icons/Category PART/Design.png",
  },
  {
    name: "Sales",
    count: "756 jobs available",
    icon: "/Icons/Category PART/Sales.png",
  },
  {
    name: "Marketing",
    count: "140 jobs available",
    icon: "/Icons/Category PART/marketing.png",
    active: true,
  },
  {
    name: "Finance",
    count: "325 jobs available",
    icon: "/Icons/Category PART/finance.png",
  },
  {
    name: "Technology",
    count: "436 jobs available",
    icon: "/Icons/Category PART/Technology.png",
  },
  {
    name: "Engineering",
    count: "542 jobs available",
    icon: "/Icons/Category PART/Engineering.png",
  },
  {
    name: "Business",
    count: "211 jobs available",
    icon: "/Icons/Category PART/Business.png",
  },
  {
    name: "Human Resource",
    count: "346 jobs available",
    icon: "/Icons/Category PART/HR.png",
  },
];

export default function CategoryGrid() {
  const router = useRouter();

  const handleCategoryClick = (categoryName) => {
    router.push(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  const handleShowAll = () => {
    router.push("/jobs");
  };

  return (
    <section className="w-full bg-white flex justify-center">
      <div className="w-full max-w-[1440px] h-auto md:h-[633px] px-[16px] pb-[40px] md:px-[124px] md:pt-[72px] md:pb-0 flex flex-col gap-[24px] md:gap-[48px] overflow-hidden">
        <div className="flex items-center justify-between">
          <h2
            className={`${clashDisplay.className} w-[323px] md:w-auto h-auto md:h-[38px] text-[32px] md:text-[48px] font-semibold text-[#25324B] leading-[1.2] md:leading-[1.1]`}
          >
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <button
            onClick={handleShowAll}
            className={`${epilogue.className} hidden lg:inline-flex items-center justify-center px-6 py-3 bg-[#4640DE] text-white text-[16px] leading-[1.6] font-semibold rounded-[4px] hover:opacity-90 transition-opacity`}
          >
            Show all jobs
            <span className="ml-2" aria-hidden>
              →
            </span>
          </button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-[16px] md:gap-[32px] w-full md:w-[1192px]">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start border p-[16px] md:p-[32px] w-full md:w-[274px] h-[84px] md:h-[214px] text-left transition-all hover:-translate-y-1 ${
                category.active
                  ? "bg-[#4640DE] text-white border-transparent shadow-[0_24px_80px_rgba(70,64,222,0.30)]"
                  : "bg-white text-[#25324B] border-[#D6DDEB] hover:border-[#4640DE]"
              }`}
            >
              <div className="flex items-center gap-[16px] md:gap-0 md:flex-col md:items-start">
                <div className="md:mb-6 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={48}
                    height={48}
                    className={`w-[40px] h-[40px] md:w-[48px] md:h-[48px] ${category.active ? "brightness-0 invert" : ""}`}
                  />
                </div>

                <div className="mt-0 md:mt-auto flex flex-col justify-center">
                  <p className="text-[18px] md:text-[20px] font-bold leading-tight md:mb-1">
                    {category.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1 md:mt-0">
                    <p
                      className={`text-[14px] md:text-[16px] ${category.active ? "text-white/80" : "text-[#7C8493]"}`}
                    >
                      {category.count}
                    </p>
                    <span
                      className={`hidden md:inline ${category.active ? "text-white" : "text-[#25324B]"}`}
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`md:hidden flex items-center justify-center ${category.active ? "text-white" : "text-[#25324B]"}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleShowAll}
          className={`${epilogue.className} lg:hidden flex items-center justify-center gap-[16px] w-[144px] h-[26px] mx-auto mt-2 text-[#4640DE] font-semibold text-[16px] hover:opacity-80 transition-opacity`}
        >
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
