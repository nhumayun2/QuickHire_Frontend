export default function Footer() {
  return (
    <footer className="bg-[#202430] text-white pt-16 pb-10">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)] gap-10 pb-10 border-b border-white/10">
          <div className="space-y-4">
            <h3 className="text-[20px] font-semibold">QuickHire</h3>
            <p className="text-sm text-white/70 max-w-[280px]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="text-[14px] font-semibold text-white/80">About</h4>
            <ul className="space-y-2 text-white/70">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="space-y-3 text-sm">
            <h4 className="text-[14px] font-semibold text-white/80">
              Resources
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[14px] font-semibold text-white/80">
              Get job notifications
            </h4>
            <p className="text-sm text-white/70">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 rounded-[8px] bg-[#171A23] border border-white/10 px-4 py-3 text-sm placeholder:text-white/40 outline-none"
              />
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-[8px] bg-[#4640DE] text-sm font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-white/60">
          <p>2021 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-[#171A23]" />
            <span className="w-8 h-8 rounded-full bg-[#171A23]" />
            <span className="w-8 h-8 rounded-full bg-[#171A23]" />
            <span className="w-8 h-8 rounded-full bg-[#171A23]" />
            <span className="w-8 h-8 rounded-full bg-[#171A23]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

