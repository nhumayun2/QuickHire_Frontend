const featuredJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    type: "Full Time",
    tags: ["Design", "Business"],
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    tags: ["Marketing"],
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    type: "Full Time",
    tags: ["Design"],
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    tags: ["Design", "Business"],
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    tags: ["Marketing"],
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    tags: ["Technology"],
  },
];

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#D6DDEB] text-[#4640DE] bg-[#F8F8FD]">
      {children}
    </span>
  );
}

export default function FeaturedJobs() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredJobs.map((job) => (
            <article
              key={job.id}
              className="border border-[#E6E8F0] rounded-[16px] px-5 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#F8F8FD]" />
                <Badge>{job.type}</Badge>
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
                {job.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>

        <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4640DE] lg:hidden">
          Show all jobs
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}

