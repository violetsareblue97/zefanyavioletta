import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Report {
  id: string;
  imageSrc: string;
  projectname: string;
  link: string;
  desc: string;
  sourcecode: string;
}

// Kartu individual\
const ProjectCard: React.FC<{ report: Report }> = ({ report }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="flex flex-col h-full rounded-tr-4xl rounded-bl-4xl bg-white/5 border border-[#987ed0] overflow-hidden transition-all duration-500 hover:border-[#79e0e0]/50 hover:shadow-[0_0_30px_-10px_rgba(152,126,208,0.3)]">

      {/* Gambar & judul */}
      <div className="relative h-64 overflow-hidden">
        <a href={report.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
          <img
            src={report.imageSrc}
            alt={report.projectname}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="array text-xl text-white font-bold leading-tight line-clamp-2">
              {report.projectname}
            </h3>
          </div>
        </a>
      </div>

      {/* Deskripsi & link */}
      <div className="p-5 flex flex-col justify-between grow bg-black/40">
        <div className="mb-4">
          {/* Teks: clamp 3 baris kalau belum expanded */}
          <p
            className={cn(
              "khand text-sm text-white/70 leading-relaxed transition-all duration-300",
              !expanded && "line-clamp-3"
            )}
          >
            {report.desc}
          </p>

          {/* Tombol read more / read less */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-xs text-[#987ed0] hover:text-[#79e0e0] transition-colors cursor-pointer khand"
          >
            {expanded ? "Read less ↑" : "Read more ↓"}
          </button>
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
  );
};

// Carousel utama
export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  { reports: Report[] } & React.HTMLAttributes<HTMLDivElement>
>(({ reports }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
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

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 340 + 24;
      container.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      {/* Arrow buttons */}
      <div className="flex items-center justify-end px-6 md:px-16 lg:px-24 mb-4 gap-2">
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

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide gap-6 px-6 md:px-16 lg:px-24 pb-4"
      >
        {reports.map((report) => (
          <div
            key={report.id}
            className="shrink-0 w-[300px] sm:w-[340px] snap-start"
          >
            <ProjectCard report={report} />
          </div>
        ))}
      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";
export default ShareholderReports;