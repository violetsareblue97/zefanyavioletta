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
  desc: React.ReactNode;
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
    <section
      
    >
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
    className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start"
  >
    {/* Container Utama Card */}
    <div className="flex flex-col group border border-white/10 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      
      {/* Bagian Gambar dengan Link */}
      <div className="relative overflow-hidden rounded-t-lg h-[320px] sm:h-[380px] group-hover:shadow-lg transition-all duration-300">
        <a href={report.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          <img 
            src={report.imageSrc} 
            alt={report.projectname}
            className="w-full h-full object-cover"
          />
          {/* Project Name di pojok kiri bawah gambar */}
          <div className="absolute bottom-4 left-4">
            <h3 className="array text-2xl text-white font-bold drop-shadow-md">
              {report.projectname}
            </h3>
          </div>
        </a>
      </div>

      {/* Bagian Deskripsi (Hitam di bawah foto) */}
      <div className="p-4 rounded-b-lg bg-white">
        <p className="khand text-sm text-white/80 leading-relaxed">
          {report.desc}
        </p>
      </div>

    </div>
  </div>
))}
      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";