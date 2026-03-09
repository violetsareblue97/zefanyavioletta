import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes
import { p } from "framer-motion/client";

// Define the type for a single report item
export interface Report {
  id: string;
  imageSrc: string;
  projectname: string;
  link: string;
  desc: string;
  sourcecode: string;
}


export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  { reports: Report[] } & React.HTMLAttributes<HTMLDivElement>
>(({ reports}, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Function to handle scrolling and update arrow visibility
  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for precision
    }
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability();
      container.addEventListener("scroll", checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [reports, checkScrollability]);

  // Scroll handler for navigation buttons
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of the visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between px-4 sm:px-6 mb-4">
        <h2 id="reports-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          {}
        </h2>
        <div className="hidden sm:flex items-center gap-2">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "p-2 rounded-full border border-border bg-card text-card-foreground transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "p-2 rounded-full border border-border bg-card text-card-foreground transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-4 md:space-x-6 px-4 sm:px-6"
      >

{reports.map((report) => (
  <div
    key={report.id}
    className="shrink w-70 sm:w-[320px] snap-start"
  >
    {/* Card Container */}
    <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#987ed0]/50 hover:shadow-[0_0_30px_-10px_rgba(152,126,208,0.3)]">
      
      {/* Gambar & Judul */}
      <div className="relative h-80 overflow-hidden">
        <a href={report.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
          <img 
            src={report.imageSrc} 
            alt={report.projectname}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay agar teks lebih terbaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="array text-2xl text-white font-bold leading-tight">
              {report.projectname}
            </h3>
          </div>
        </a>
      </div>

      {/* Deskripsi (Bagian Bawah) */}
      <div className="p-6 flex-grow flex flex-col justify-between bg-black/40">
        <div className="khand text-base text-white/70 leading-relaxed mb-4">
          {report.desc}
        </div>
        
        <a 
          href={report.sourcecode} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#e8f47e] font-bold text-sm hover:translate-x-2 transition-transform"
        >
          View Source Code <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  </div>
))}

      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";

export default ShareholderReports;