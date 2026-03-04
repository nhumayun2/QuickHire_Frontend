const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    type: "Full-Time",
    tags: ["Design"],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Developer"],
  },
  {
    id: 4,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    tags: ["Marketing", "Management"],
  },
];

function Tag({ children, variant = "default" }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center";
  const variants = {
    default: "bg-[#F8F8FD] text-[#4640DE] border-transparent",
    outline: "bg-white text-[#4640DE] border-[#D6DDEB]",
    soft: "bg-[#FFF6E6] text-[#FFB836] border-transparent",
  };

  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

export default function LatestJobs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-[#25324B]">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <button className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-[#4640DE]">
            Show all jobs
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* Desktop layout: two columns of cards */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
          {jobs.concat(jobs).map((job, index) => (
            <article
              key={`${job.id}-${index}`}
              className="flex items-center justify-between border border-[#E6E8F0] rounded-[16px] px-6 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)]"
            >
              <div>
                <h3 className="text-[18px] font-semibold text-[#25324B] mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-[#7C8493] mb-4">
                  {job.company} · {job.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="outline">{job.type}</Tag>
                  {job.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile layout: single column list */}
        <div className="space-y-4 lg:hidden">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="border border-[#E6E8F0] rounded-[16px] px-5 py-5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.03)]"
            >
              <h3 className="text-[18px] font-semibold text-[#25324B] mb-1">
                {job.title}
              </h3>
              <p className="text-sm text-[#7C8493] mb-4">
                {job.company} · {job.location}
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag variant="outline">{job.type}</Tag>
                {job.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
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

