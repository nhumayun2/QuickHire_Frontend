"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Red_Hat_Display } from "next/font/google";
import logo from "../../public/navbarLogoLeft.png";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-center bg-transparent h-[60px] pt-[8px] pb-[16px] px-[16px] md:h-[78px] md:p-0">
      <div className="w-full max-w-[1440px] md:px-[124px] flex items-center justify-between h-full">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="flex items-center gap-2 w-[152px] h-[36px] md:w-auto md:h-auto"
          >
            <Image
              src={logo}
              alt="QuickHire Logo"
              width={32}
              height={32}
              className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]"
            />
            <span
              className={`${redHatDisplay.className} text-xl md:text-2xl font-bold text-[#25324B] tracking-[-0.01em]`}
            >
              QuickHire
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-[#515B6F]">
            <Link
              href="/jobs"
              className={`hover:text-[#4640DE] transition-colors py-6 ${pathname === "/jobs" ? "text-[#4640DE] font-bold border-b-2 border-[#4640DE]" : ""}`}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className={`hover:text-[#4640DE] transition-colors py-6 ${pathname === "/companies" ? "text-[#4640DE] font-bold border-b-2 border-[#4640DE]" : ""}`}
            >
              Browse Companies
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  href="/admin/applications"
                  className={`hover:text-[#4640DE] transition-colors py-6 ${pathname.includes("applications") ? "text-[#4640DE] font-bold border-b-2 border-[#4640DE]" : ""}`}
                >
                  Applications
                </Link>
                <Link
                  href="/admin/jobs"
                  className={`hover:text-[#4640DE] transition-colors py-6 ${pathname.includes("manage") ? "text-[#4640DE] font-bold border-b-2 border-[#4640DE]" : ""}`}
                >
                  Manage Jobs
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {mounted &&
            (isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="text-[#4640DE] px-6 py-3 font-bold hover:bg-blue-50 rounded-lg transition-all"
                >
                  Dashboard
                </Link>
                <div className="h-6 w-[1px] bg-[#D6DDEB]"></div>
                <button
                  onClick={handleLogout}
                  className="bg-[#FF4747]/10 text-[#FF4747] px-6 py-3 font-bold rounded-lg border border-[#FF4747]/20 hover:bg-[#FF4747] hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-[#4640DE] px-6 py-3 font-bold hover:bg-blue-50 rounded-lg transition-all"
                >
                  Login
                </Link>
                <div className="h-6 w-[1px] bg-[#D6DDEB]"></div>
                <Link
                  href="/register"
                  className="bg-[#4640DE] text-white px-6 py-3 font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ))}
        </div>
        <button className="md:hidden flex items-center justify-center w-[36px] h-[36px] rounded-[96px] border border-[#D6DDEB] p-[8px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#25324B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
}
