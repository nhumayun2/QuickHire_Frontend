import Link from "next/link";
import Image from "next/image";
import logo from "../../public/navbarLogoLeft.png";
import { Red_Hat_Display } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-[78px] px-6 lg:px-[124px] bg-white/95 backdrop-blur border-b border-[#EFF0F6] shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="QuickHire Logo" width={32} height={32} />
          <span
            className={`${redHatDisplay.className} text-2xl font-bold text-[#25324B] tracking-[-0.01em]`}
          >
            QuickHire
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-base font-medium text-brand-text">
          <Link href="/jobs" className="hover:text-brand transition-colors">
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="hover:text-brand transition-colors"
          >
            Browse Companies
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 font-medium">
        <Link
          href="/login"
          className="text-brand hover:opacity-80 transition-opacity px-6 py-3"
        >
          Login
        </Link>
        <div className="h-6 w-[1px] bg-gray-300"></div>
        <Link
          href="/register"
          className="bg-brand text-white px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
