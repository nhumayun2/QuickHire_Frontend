"use client";

import { useRouter } from "next/navigation";

const categories = [
  { name: "Design", count: "235 jobs available", icon: "🛠" },
  { name: "Sales", count: "756 jobs available", icon: "📈" },
  { name: "Marketing", count: "140 jobs available", icon: "📣", active: true },
  { name: "Finance", count: "325 jobs available", icon: "💰" },
  { name: "Technology", count: "436 jobs available", icon: "💻" },
  { name: "Engineering", count: "542 jobs available", icon: "⌨️" },
  { name: "Business", count: "211 jobs available", icon: "💼" },
  { name: "Human Resource", count: "346 jobs available", icon: "👥" },
];

export default function CategoryGrid() {
  const router = useRouter();

  const handleCategoryClick = (categoryName) => {
    // Navigate to the jobs page with the category filter
    router.push(`/jobs?category=${encodeURIComponent(categoryName)}`);
  };

  const handleShowAll = () => {
    // Navigate to the jobs page with no filters
    router.push("/jobs");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#25324B]">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>
          <button
            onClick={handleShowAll}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-[#4640DE] hover:opacity-80 transition-opacity"
          >
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex flex-col items-start justify-between border rounded-[12px] px-6 py-6 text-left transition-all hover:-translate-y-1 ${
                category.active
                  ? "bg-[#4640DE] text-white border-transparent shadow-[0_24px_80px_rgba(70,64,222,0.35)]"
                  : "bg-white text-[#25324B] border-[#E6E8F0] hover:shadow-[0_24px_80px_rgba(0,0,0,0.05)] hover:border-[#4640DE]"
              }`}
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-lg bg-[#F8F8FD] mb-6">
                <span
                  className={
                    category.active
                      ? "text-white text-xl"
                      : "text-[#4640DE] text-xl"
                  }
                >
                  {category.icon}
                </span>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">{category.name}</p>
                <p
                  className={`text-sm ${
                    category.active ? "text-white/80" : "text-[#7C8493]"
                  }`}
                >
                  {category.count}
                </p>
              </div>
              <span
                className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${
                  category.active ? "text-white" : "text-[#4640DE]"
                }`}
              >
                View jobs <span aria-hidden>→</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleShowAll}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4640DE] lg:hidden hover:opacity-80 transition-opacity"
        >
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
