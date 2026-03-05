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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1192px] px-6 lg:px-0">
        <div className="flex items-center justify-between mb-10">
          <h2
            className={`${clashDisplay.className} text-[48px] font-semibold text-[#25324B] leading-[1.1]`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              style={{ width: "274px", height: "214px" }}
              className={`flex flex-col items-start border p-[32px] text-left transition-all hover:-translate-y-1 ${
                category.active
                  ? "bg-[#4640DE] text-white border-transparent shadow-[0_24px_80px_rgba(70,64,222,0.30)]"
                  : "bg-white text-[#25324B] border-[#D6DDEB] hover:border-[#4640DE]"
              }`}
            >
              <div className="mb-6">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={48}
                  height={48}
                  className={category.active ? "brightness-0 invert" : ""}
                />
              </div>

              <div className="mt-auto">
                <p className="text-[20px] font-bold mb-1">{category.name}</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-[16px] ${category.active ? "text-white/80" : "text-[#7C8493]"}`}
                  >
                    {category.count}
                  </p>
                  <span
                    className={
                      category.active ? "text-white" : "text-[#25324B]"
                    }
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleShowAll}
          className={`${epilogue.className} mt-8 w-full inline-flex items-center justify-center py-4 bg-[#4640DE] text-white text-[16px] font-semibold lg:hidden`}
        >
          Show all jobs
          <span className="ml-2" aria-hidden>
            →
          </span>
        </button>
      </div>
    </section>
  );
}
