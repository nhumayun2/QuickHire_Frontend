"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { Epilogue } from "next/font/google";
import Wbst from "../../public/Dashbo.png";

const clashDisplay = localFont({
  src: "../../public/fonts/ClashDisplay-Bold.otf",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function CallToAction() {
  return (
    <section className="w-full bg-white flex justify-center overflow-hidden">
      <div className="relative w-full max-w-[1440px] h-[640px] md:h-[558px]">
        <div
          className="
            absolute
            w-[calc(100%-32px)] md:w-[1192px]
            h-[560px] md:h-[414px]
            top-[40px] md:top-[72px]
            left-[16px] md:left-[124px]
            bg-[#4640DE]
            z-0
            [clip-path:polygon(40px_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%,0_40px)]
            md:[clip-path:polygon(80px_0,100%_0,100%_calc(100%-80px),calc(100%-80px)_100%,0_100%,0_80px)]
          "
        />
        <div className="absolute top-[88px] md:top-[140px] left-[32px] md:left-[200px] z-10 w-[311px] md:max-w-[450px] text-white flex flex-col gap-[16px] md:gap-[24px]">
          <h2
            className={`${clashDisplay.className} text-[36px] md:text-[48px] font-semibold leading-[1.1] md:leading-[1.1] tracking-tight`}
          >
            Start posting <br /> jobs today
          </h2>

          <p
            className={`${epilogue.className} text-[14px] md:text-[16px] leading-[1.6] text-white/80`}
          >
            Start posting jobs for only $10.
          </p>

          <button
            className={`${epilogue.className} inline-flex items-center justify-center w-[169px] h-[50px] bg-white text-[#4640DE] text-[16px] font-semibold shadow-xl hover:bg-gray-50 transition-colors mt-2 md:mt-0`}
          >
            Sign Up For Free
          </button>
        </div>
        <div className="absolute top-[298px] md:top-[140px] left-[36px] md:left-[682px] w-[404px] md:w-[564px] h-[246px] md:h-[346px] z-20">
          <div className="rounded-[8px] overflow-hidden bg-white p-1 md:p-1 shadow-2xl w-full h-full">
            <Image
              src={Wbst}
              alt="Dashboard preview"
              width={564}
              height={346}
              className="w-full h-full object-cover md:object-cover rounded-[4px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
