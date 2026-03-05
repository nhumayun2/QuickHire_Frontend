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
    // Wrapping in setTimeout(0) prevents the "cascading renders" error
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
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between h-[78px] px-6 lg:px-[124px] bg-transparent">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="QuickHire Logo" width={32} height={32} />
          <span
            className={`${redHatDisplay.className} text-2xl font-bold text-[#25324B] tracking-[-0.01em]`}
          >
            QuickHire
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-base font-medium text-[#515B6F]">
          <Link href="/jobs" className="hover:text-[#4640DE] transition-colors">
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="hover:text-[#4640DE] transition-colors"
          >
            Browse Companies
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 font-medium">
        {mounted &&
          (isLoggedIn ? (
            <>
              <Link
                href="/admin"
                className="text-[#4640DE] hover:opacity-80 px-6 py-3 font-bold"
              >
                Dashboard
              </Link>
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-6 py-3 font-bold rounded-lg border border-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[#4640DE] hover:opacity-80 px-6 py-3 font-bold"
              >
                Login
              </Link>
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <Link
                href="/register"
                className="bg-[#4640DE] text-white px-6 py-3 hover:opacity-90 font-bold rounded-lg"
              >
                Sign Up
              </Link>
            </>
          ))}
      </div>
    </nav>
  );
}
