import HeroSection from "@/components/ui/particle-effect"; 

export default function App() {
  return (
    // 'min-h-screen' dan 'overflow-y-auto' memastikan halaman bisa discroll
    <main className="min-h-screen bg-black overflow-y-auto">
      
      {/* Bagian Hero dengan particle effect (Fixed) */}
      <div className="relative w-full h-screen">
        <HeroSection />
      </div>

      {/* Bagian Projects / Section lainnya */}
      <section id="projects" className="relative z-10 p-8 md:p-16">
      </section>
      
    </main>
  );
}