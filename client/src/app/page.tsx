import About from "@/components/home/about";
import Hero from "@/components/home/hero";
import Services from "@/components/home/services";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Hero />
      <About />
      <Services />
    </main>
  );
}
