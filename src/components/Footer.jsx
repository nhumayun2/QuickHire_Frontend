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
      className={`${epilogue.className} relative mx-auto w-[1440px] h-[497px] bg-[#202430] text-white overflow-hidden`}
    >
      <div className="absolute top-[64px] left-[124px] w-[376px] h-[146px] flex flex-col gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="QuickHire Logo" width={32} height={32} />
          <span className="text-[24px] font-bold tracking-tight">
            QuickHire
          </span>
        </Link>
        <p className="text-[16px] leading-[1.6] text-[#D6DDEB] font-normal">
          Great platform for the job seeker that passionate about startups. Find
          your dream job easier.
        </p>
      </div>
      <div className="absolute top-[64px] left-[588px] w-[295px] h-[241px] flex justify-between">
        <div className="w-[105px] h-full flex flex-col gap-[18px]">
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
        <div className="w-[105px] h-full flex flex-col gap-[18px]">
          <h4 className="text-[18px] font-semibold leading-[1.6]">Resources</h4>
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
      <div className="absolute top-[64px] left-[954px] w-[362px] space-y-6">
        <h4 className="text-[18px] font-semibold leading-[1.6]">
          Get job notifications
        </h4>
        <p className="text-[16px] leading-[1.6] font-normal text-[#D6DDEB]">
          The latest job news, articles, sent to your inbox weekly.
        </p>
        <div className="flex gap-2 w-[362px] h-[50px]">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 px-4 bg-white text-[#202430] border-none outline-none text-[16px]"
          />
          <button className="px-6 bg-[#4640DE] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>
      </div>
      <div
        className="absolute top-[385px] left-[124px] w-[1192px] border-t-2 border-white/10"
        aria-hidden="true"
      />
      <div className="absolute top-[425px] left-[124px] w-[1192px] flex justify-between items-center">
        <p className="text-[16px] font-medium leading-[1.6] text-white/50">
          2021 @ QuickHire. All rights reserved.
        </p>
        <div className="flex gap-6 w-[256px] justify-end">
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
    </footer>
  );
}
