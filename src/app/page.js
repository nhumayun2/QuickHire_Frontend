import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "@/components/Companies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Companies />
      </main>
      <Footer />
    </div>
  );
}
