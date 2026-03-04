import Image from "next/image";
import dashboard from "../../public/file.svg";

export default function CallToAction() {
  return (
    <section className="bg-[#4640DE]">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-white max-w-[360px] space-y-4">
          <h2 className="text-[28px] lg:text-[32px] font-semibold leading-tight">
            Start posting jobs today
          </h2>
          <p className="text-sm lg:text-base text-white/80">
            Start posting jobs for only $10.
          </p>
          <button className="mt-4 inline-flex items-center justify-center px-8 py-3 rounded-[8px] bg-white text-[#4640DE] text-sm font-semibold shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            Sign Up For Free
          </button>
        </div>

        <div className="relative w-full max-w-[560px]">
          <div className="rounded-[16px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.35)]">
            <Image
              src={dashboard}
              alt="Dashboard preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

