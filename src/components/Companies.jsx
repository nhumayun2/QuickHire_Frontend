import Image from "next/image";
import vodafoneLogo from "../../public/vodafone-2017-logo.png";
import intelLogo from "../../public/intel-3.png";
import teslaLogo from "../../public/tesla-9 1.png";
import amdLogo from "../../public/amd-logo-1.png";
import talkitLogo from "../../public/talkit 1.png";

const companies = [
  { id: "vodafone", src: vodafoneLogo, alt: "Vodafone" },
  { id: "intel", src: intelLogo, alt: "Intel" },
  { id: "tesla", src: teslaLogo, alt: "Tesla" },
  { id: "amd", src: amdLogo, alt: "AMD" },
  { id: "talkit", src: talkitLogo, alt: "Talkit" },
];

export default function Companies() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-12 lg:py-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm lg:text-base text-[#7C8493] font-medium">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 lg:gap-x-14 w-full lg:w-auto">
          {companies.map((company) => (
            <Image
              key={company.id}
              src={company.src}
              alt={company.alt}
              className="h-6 lg:h-8 w-auto opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
