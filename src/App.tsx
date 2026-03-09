import React from "react";
import AntiGravityCanvas from "@/components/ui/particle-effect";
import { ShareholderReports } from "@/components/ui/carousel";
import {type Report} from "@/components/ui/carousel";
import { Typewriter } from "@/components/ui/typewriter";
import { CircularTestimonials as AboutCarousel } from "@/components/ui/about-me";

const Navigation: React.FC = () => {
    return (
        <nav className="absolute top-0 w-full z-20 flex justify-center items-center p-6 md:p-8">
            <div className=" khand md:flex space-x-8" style={{color: '#e8f47e'}}>
                <a href="#contacts" className="hover:text-white transition-colors">Contacts</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
            </div>
        </nav>
    )
}

const HeroContent: React.FC = () => {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
            <div className="max-w-4xl w-full text-center space-y-8">
                
                <h1 className="array text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-linear-to-b from-[#987ed0] to-[#e8f47e] tracking-tighter mix-blend-difference" style={{ letterSpacing: '2px' }}>
                    Hi! <br/> I'm Zefanya
                </h1>
                
                <p className="khand max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    Information Systems & Technology student driven by curiosity. Constantly exploring the intersection of full-stack development and machine learning. <br/> One line of code at a time ^_^
                </p>

                <div className="flex gap-7 pt-4 pointer-events-auto justify-center khand">
                    {/* LinkedIn */}
                    <a href="https://linkedin.com/in/zefanyavioletta/" target="_blank" className="flex items-center px-10 py-3 border border-[#987ed0] text-[#987ed0] rounded-full font-bold hover:bg-[#987ed0] hover:text-black transition-all"
                    ><img src="/public/linkedin.png" alt="LinkedIn" className="w-6 h-6 mr-3"/>LinkedIn
                    </a>

                    {/* Github */}
                    <a href="https://github.com/violetsareblue97" target="_blank" className="flex items-center px-10 py-3 border border-[#987ed0] text-[#987ed0] rounded-full font-bold hover:bg-[#987ed0] hover:text-black transition-all"
                    ><img src="/public/github.png" alt="GitHub" className="w-6 h-6 mr-3"/>GitHub
                    </a>

                    {/* Resume*/}
                    <a href="/cv-zefanya.pdf" download className="px-6 py-3 bg-[#e8f47e] text-black rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2">
                        Download My Resume
                    </a>

                    {/* Contact Me */}
                    <a href="mailto:zefanyavioletta97@gmail.com" className="px-6 py-3 border border-[#e8f47e] text-[#e8f47e] rounded-full font-bold hover:bg-[#e8f47e] hover:text-black transition-all">
                        Contact Me
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- const Reports Data for Carousel ---
        const reportsData: Report[] = [
          {
          id: "libraria",
          imageSrc: "./public/libraria.png",
          projectname: "Libraria",
          link: "https://libraria-nu.vercel.app/",
          sourcecode: "https://github.com/violetsareblue97/Libraria.git",
          desc: "A digital Library management web based system."
        },

        {
          id: "emailsecure",
          imageSrc: "https://b.zmtcdn.com/investor-relations/1199bb1a7e905267f520ace8be13fdad_1746093395.png",
          projectname: "Email Secure+",
          link: "https://emailsecure.streamlit.app/",
          sourcecode: "https://github.com/violetsareblue97/email-secure.git",
          desc: "An email phishing detector | Machine Learning."
        }
      ];
      
      const words = ["My Projects"]
      const words2 = ["About Me"]

      const aboutData = [
  {
    title: "Frontend",
    description: "Building responsive & beautiful interfaces.",
    items: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"]
  },
  {
    title: "Backend",
    description: "Creating scalable server-side systems.",
    items: ["Node.js", "Python", "PostgreSQL", "API Design"]
  },
  {
    title: "Machine Learning",
    description: "Exploring data-driven insights.",
    items: ["TensorFlow", "Scikit-Learn", "Data Analysis", "NLP"]
  }
];


// --- Main App Component ---

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <AntiGravityCanvas />

    <div className="relative z-10 w-full">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-screen w-full">
         <AntiGravityCanvas />
         <HeroContent />
      </div>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-16">
        <div className="flex justify-center items-center mb-12 px-4">
          <h2 className="masked-text text-5xl md:text-6xl array tracking-tight text-center">
            <Typewriter words={words} speed={150} delayBetweenWords={7000}  cursor={true} cursorChar="|"/>
            </h2>
            </div>
      {/* Component Carousel */}
      <ShareholderReports reports={reportsData} />
          </section>

      {/* Projects Section */}
      <section id="about" className="relative z-10 py-16">
        <div className="flex justify-center items-center mb-12 px-4">
          <h2 className="masked-text text-5xl md:text-6xl array tracking-tight text-center">
            <Typewriter words={words2} speed={150} delayBetweenWords={7000}  cursor={true} cursorChar="|"/>
            </h2>
            </div>
            <AboutCarousel cards={aboutData} />
            </section>
            
          </div>
          </div>
        );
      }