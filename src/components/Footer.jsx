"use client";

import Image from "next/image";
import Link from "next/link";
import { Epilogue } from "next/font/google";
import logo from "../../public/navbarLogoLeft.png";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Footer() {
  return (
    <footer
      className={`${epilogue.className} w-full bg-[#202430] flex justify-center overflow-hidden`}
    >
      {/* Container - Mobile: flex-col py-[40px] px-[16px] | Desktop: block relative h-[497px] */}
      <div className="relative w-full max-w-[1440px] h-auto md:h-[497px] flex flex-col md:block py-[40px] px-[16px] md:p-0 text-white gap-[32px] md:gap-0">
        {/* Logo & Description - Mobile: gap-[32px] flex-col | Desktop: absolute top-[64px] left-[124px] */}
        <div className="w-full md:w-[376px] flex flex-col gap-[32px] md:gap-8 md:absolute md:top-[64px] md:left-[124px]">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="QuickHire Logo" width={32} height={32} />
            <span className="text-[24px] font-bold tracking-tight">
              QuickHire
            </span>
          </Link>
          <p className="text-[16px] leading-[1.6] text-[#D6DDEB] font-normal">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* Links Array - Mobile: gap-[96px] flex-row | Desktop: absolute top-[64px] left-[588px] */}
        <div className="w-full md:w-[295px] flex justify-start md:justify-between gap-[96px] md:gap-0 md:absolute md:top-[64px] md:left-[588px]">
          <div className="w-[105px] flex flex-col gap-[18px]">
            <h4 className="text-[18px] font-semibold leading-[1.6]">About</h4>
            <ul className="flex flex-col gap-4 text-[#D6DDEB] text-[16px]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Advice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[105px] flex flex-col gap-[18px]">
            <h4 className="text-[18px] font-semibold leading-[1.6]">
              Resources
            </h4>
            <ul className="flex flex-col gap-4 text-[#D6DDEB] text-[16px]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter - Mobile: gap-[16px] flex-col | Desktop: absolute top-[64px] left-[954px] */}
        <div className="w-full md:w-[362px] flex flex-col gap-[16px] md:gap-6 md:absolute md:top-[64px] md:left-[954px]">
          <h4 className="text-[18px] font-semibold leading-[1.6]">
            Get job notifications
          </h4>
          <p className="text-[16px] leading-[1.6] font-normal text-[#D6DDEB]">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex flex-col md:flex-row gap-[16px] md:gap-2 w-full md:w-[362px] md:h-[50px]">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full md:flex-1 h-[50px] md:h-full px-4 bg-white text-[#202430] border-none outline-none text-[16px]"
            />
            <button className="w-full md:w-auto h-[50px] md:h-full px-6 bg-[#4640DE] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
        <div
          className="w-full md:w-[1192px] border-t-2 border-white/10 my-[8px] md:my-0 md:absolute md:top-[385px] md:left-[124px]"
          aria-hidden="true"
        />
        <div className="w-full md:w-[1192px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[24px] md:gap-0 md:absolute md:top-[425px] md:left-[124px]">
          <p className="text-[16px] font-medium leading-[1.6] text-white/50">
            2021 @ QuickHire. All rights reserved.
          </p>
          <div className="flex gap-6 w-full md:w-[256px] justify-start md:justify-end">
            {[1, 2, 3, 4, 5].map((item) => (
              <Link
                key={item}
                href="#"
                className="w-[32px] h-[32px] rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-white/40 rounded-sm" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
