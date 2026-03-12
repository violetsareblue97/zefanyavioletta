"use client";
import { useRef } from "react"; // Removed React
import { motion, useScroll, useTransform } from "framer-motion";

// ── Skill groups — derived from actual projects in the portfolio ────────────
const STACK = [
  {
    category: "Web & Frontend",
    color: "#e8f47e",
    skills: ["React", "TypeScript", "Next.js", "JavaScript", "Tailwind CSS", "Figma"],
  },
  {
    category: "Machine Learning & AI",
    color: "#987ed0",
    skills: ["Python", "Scikit-learn"],
  },
  {
    category: "Data & Backend",
    color: "#79e0e0",
    skills: ["SQL", "PostgreSQL", "Supabase", "Pandas", "API Integration"],
  },
  {
    category: "Deployment & DevOps",
    color: "#f47e7e",
    skills: ["Streamlit", "Vercel", "Git", "GitHub Pages"],
  },
];

// ── Three scroll-reveal panels ──────────────────────────────────────────────
const sections = [
  {
    id: 1,
    title: "Who I Am",
    content: (
      <div className="space-y-5">
        <p className="khand text-3xl leading-relaxed text-white/80">
          I am an Information Systems student building tools at the intersection of 
          {" "}<span className="text-[#e8f47e]">software engineering</span> and {" "}
          <span className="text-[#987ed0]">applied AI.</span>
        </p>
        <p className="khand text-lg leading-relaxed text-white/50">
          My approach is defined by building functional, end-to-end applications rather than just model training. 
          I focus on bridging the gap between raw data and user-friendly interfaces.
          <br/><br/>
          I'm a problem-solver who enjoys the full lifecycle of a project, from debugging complex conflicts, API integrations to deploying clean, accessible web applications.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "My Stack",
    content: (
      <div className="space-y-6">
        {STACK.map(({ category, color, skills }) => (
          <div key={category}>
            <p className="khand text-xs uppercase tracking-widest mb-2" style={{ color }}>
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="khand text-sm px-4 py-1.5 rounded-full border text-white/70"
                  style={{ borderColor: color + "40", background: color + "0d" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    title: "Let's Connect",
    content: (
      <div className="space-y-6">
        <p className="khand text-3xl leading-relaxed text-white/80">I'm always happy to talk!</p>
        <div id="contacts" className="flex flex-wrap gap-3 pt-2">
          <a href="mailto:zefanyavioletta97@gmail.com" className="khand flex items-center gap-2 px-6 py-3 rounded-full bg-[#e8f47e] text-black font-bold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5">
            Email Me
          </a>
          <a href="https://linkedin.com/in/zefanyavioletta/" target="_blank" rel="noopener noreferrer" className="khand flex items-center gap-2 px-6 py-3 rounded-full border border-[#987ed0] text-[#987ed0] font-bold text-sm hover:bg-[#987ed0] hover:text-black transition-all hover:-translate-y-0.5">
            LinkedIn
          </a>
          <a href="https://github.com/violetsareblue97" target="_blank" rel="noopener noreferrer" className="khand flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/50 font-bold text-sm hover:border-white/50 hover:text-white transition-all hover:-translate-y-0.5">
            GitHub
          </a>
          <a href="/cv-zefanya.pdf" download className="khand flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/50 font-bold text-sm hover:border-white/50 hover:text-white transition-all hover:-translate-y-0.5">
            Resume ↓
          </a>
        </div>
      </div>
    ),
  },
];

export const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] text-white py-20">
      <div className="sticky top-20 flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-6 gap-12">
        <div className="w-full md:w-1/3 flex gap-8">
          <div className="relative w-1 h-64 bg-white/10 rounded-full shrink-0"> {/* Updated class */}
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-[#987ed0]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <div className="flex flex-col gap-16 pt-1">
            {sections.map((item, idx) => (
              <motion.div key={item.id}>
                <motion.span
                  className="array text-xl tracking-widest uppercase block"
                  style={{
                    color: useTransform(scrollYProgress, [idx * 0.33, idx * 0.33 + 0.1], ["#ffffff33", "#e8f47e"]),
                  }}
                >
                  {item.title}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 relative min-h-80"> {/* Updated class */}
          {sections.map((item, idx) => (
            <motion.div
              key={item.id}
              className="absolute top-0 left-0 w-full"
              style={{
                opacity: useTransform(scrollYProgress, 
                  [idx * 0.33, idx * 0.33 + 0.08, idx * 0.33 + 0.24, idx * 0.33 + 0.33], 
                  [0, 1, 1, 0]
                ),
              }}
            >
              <div className="border-l-4 border-[#987ed0] pl-6">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};