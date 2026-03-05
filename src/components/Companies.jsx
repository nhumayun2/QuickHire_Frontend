"use client";

import { Epilogue } from "next/font/google";
import Image from "next/image";
import vodafoneLogo from "../../public/vodafone-2017-logo.png";
import intelLogo from "../../public/intel-3.png";
import teslaLogo from "../../public/tesla-9 1.png";
import amdLogo from "../../public/amd-logo-1.png";
import talkitLogo from "../../public/talkit 1.png";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400"],
});

const companies = [
  { id: "vodafone", src: vodafoneLogo, alt: "Vodafone" },
  { id: "intel", src: intelLogo, alt: "Intel" },
  { id: "tesla", src: teslaLogo, alt: "Tesla" },
  { id: "amd", src: amdLogo, alt: "AMD" },
  { id: "talkit", src: talkitLogo, alt: "Talkit" },
];

export default function Companies() {
  return (
    <section className="w-full bg-white border-b border-[#E6E8F0] flex justify-center">
      <div className="w-[1440px] h-[197px] pt-[48px] pb-[48px] pl-[124px] pr-[122px] flex flex-col justify-center items-start gap-[32px] overflow-hidden">
        <p
          className={`${epilogue.className} text-[18px] leading-[1.6] text-[#7C8493] font-normal whitespace-nowrap`}
        >
          Companies we helped grow
        </p>
        <div className="relative w-full overflow-hidden pointer-events-none">
          <div className="flex items-center gap-16 animate-infinite-scroll-right min-w-max">
            {[...companies, ...companies, ...companies].map(
              (company, index) => (
                <div key={`${company.id}-${index}`} className="flex-shrink-0">
                  <Image
                    src={company.src}
                    alt={company.alt}
                    className="h-7 lg:h-8 w-auto grayscale opacity-40 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ),
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-infinite-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
