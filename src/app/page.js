import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "@/components/Companies";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Companies />
      </main>
    </div>
  );
}
