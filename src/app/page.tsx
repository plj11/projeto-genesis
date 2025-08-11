import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero
        title="Crie seu site com facilidade"
        subtitle="Uma plataforma de criação de sites intuitiva e poderosa para todos."
        showCtaButtons={true}
      />
      <Features />
    </main>
  );
}
