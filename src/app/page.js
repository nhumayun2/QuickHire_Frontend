import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "@/components/Companies";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedJobs from "@/components/FeaturedJobs";
import LatestJobs from "@/components/LatestJobs";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Companies />
        <CategoryGrid />
        <CallToAction />
        <FeaturedJobs />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
}
