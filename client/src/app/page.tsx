import About from "@/components/home/about";
import Hero from "@/components/home/hero";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Hero />
      <About />
    </main>
  );
}
