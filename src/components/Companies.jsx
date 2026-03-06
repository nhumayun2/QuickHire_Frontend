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
      {/* Container - Mobile: h-[317px] p-[40px 16px] | Desktop: original */}
      <div className="w-full max-w-[1440px] h-[317px] md:h-[197px] py-[40px] px-[16px] md:pt-[48px] md:pb-[48px] md:pl-[124px] md:pr-[122px] flex flex-col justify-start md:justify-center items-start gap-[32px] overflow-hidden">
        {/* Title - Mobile: 243x29 opacity-0.5 | Desktop: original */}
        <p
          className={`${epilogue.className} w-[243px] h-[29px] md:w-auto md:h-auto opacity-50 md:opacity-100 text-[18px] leading-[1.6] text-[#7C8493] font-normal whitespace-nowrap`}
        >
          Companies we helped grow
        </p>

        {/* --- MOBILE VIEW: Static Wrapping Grid (343x176) --- */}
        <div className="w-full max-w-[343px] h-[176px] flex md:hidden flex-wrap items-center justify-between gap-y-8 pr-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="w-[45%] flex justify-start items-center"
            >
              <Image
                src={company.src}
                alt={company.alt}
                className="h-6 w-auto grayscale opacity-40"
              />
            </div>
          ))}
        </div>

        {/* --- DESKTOP VIEW: Infinite Scroll --- */}
        <div className="hidden md:block relative w-full overflow-hidden pointer-events-none">
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
