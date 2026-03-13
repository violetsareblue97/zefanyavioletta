import React from "react";
import AntiGravityCanvas from "@/components/ui/particle-effect";
import { ShareholderReports } from "@/components/ui/carousel";
import {type Report} from "@/components/ui/carousel";
import { Typewriter } from "@/components/ui/typewriter";
import { AboutMe } from "./components/ui/about-me"; 

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

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full py-12 mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                
                {/* Gradient Line Decor */}
                <div className="w-24 h-1 bg-linear-to-r from-[#79e0e0] via-[#987ed0] to-[#e8f47e] rounded-full" />

                <div className="flex flex-col items-center gap-2">
                    <h3 className="array text-3xl md:text-4xl text-transparent bg-clip-text bg-linear-to-r from-[#987ed0] to-[#e8f47e]">
                        Thank you for visiting!
                    </h3>
                    <p className="khand text-white/40 text-sm tracking-widest uppercase">
                        © 2026 - Built by Zefanya Violetta
                    </p>
                </div>

                {/* Quick Links for Mobile Accessibility */}
                <div className="khand flex gap-6 text-xs uppercase tracking-wider text-white/60">
                    <a href="#" className="hover:text-[#e8f47e] transition-colors">Back to top</a>
                    <a href="https://github.com/violetsareblue97" target="_blank" className="hover:text-[#e8f47e] transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

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

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-7 pt-4 pointer-events-auto justify-center khand">
                    {/* LinkedIn */}
                    <a href="https://linkedin.com/in/zefanyavioletta/" target="_blank" className="flex items-center justify-center px-10 py-3 border border-[#987ed0] text-[#987ed0] rounded-full font-bold hover:bg-[#987ed0] hover:text-black transition-all"
                    ><img src="linkedin.png" alt="LinkedIn" className="w-6 h-6 mr-3"/>LinkedIn
                    </a>

                    {/* Github */}
                    <a href="https://github.com/violetsareblue97" target="_blank" className="flex items-center justify-center px-10 py-3 border border-[#987ed0] text-[#987ed0] rounded-full font-bold hover:bg-[#987ed0] hover:text-black transition-all"
                    ><img src="github.png" alt="GitHub" className="w-6 h-6 mr-3"/>GitHub
                    </a>

                    {/* Resume*/}
                    <a href="/ZEFANYA-VIOLETTA-CV-SOFTWARE-DEVELOPER.pdf" download className=" px-6 py-3 bg-[#e8f47e] text-black rounded-full font-bold hover:opacity-90 transition-all gap-2">
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
          imageSrc: "libraria.png",
          projectname: "Libraria",
          link: "https://libraria-nu.vercel.app/",
          sourcecode: "https://github.com/violetsareblue97/Libraria.git",
          desc: "Developed a web based Library system that fetches and displays real-time book metadata using external APIs. Focused on building a clean UI/UX and efficient state management for a seamless browsing experience."
        },

        {
          id: "foosecurityml",
          imageSrc: "foodsecurity.png",
          projectname: "National Food Demand Forecasting System Using PatchTST Transformer (2025)",
          link: "https://violetsareblue97.github.io/indonesia-food-security-forecasting/",
          sourcecode: "https://github.com/violetsareblue97/indonesia-food-security-forecasting.git",
          desc: "Built a PatchTST-based forecasting system that predicts Indonesia's national food consumption across 34 provinces and multiple commodities for 2026, achieving 87.34% R² accuracy."
        },

        {
          id: "emailsecure",
          imageSrc: "emailsafe.png",
          projectname: "Email Secure+",
          link: "https://emailsecure.streamlit.app/",
          sourcecode: "https://github.com/violetsareblue97/email-secure.git",
          desc: "A phishing detection tool that combines Machine Learning with real-time network security. It uses a Logistic Regression model to analyze email text and performs DNS lookups to verify sender domain authenticity (SPF/DMARC). I also integrates the Google Gemini API to provide clear explanations of potential threats, complete with custom UI design and error handling."
        },

        {
          id: "wedding",
          imageSrc: "wedding.jpg",
          projectname: "Wedding Invitation Website (In Progress)",
          link: "https://sandya-kukuh.vercel.app/",
          sourcecode: "https://github.com/violetsareblue97/wedding-invitation.git",
        desc:"Currently building an interactive wedding invitation using Next.js, where I decided to move away from traditional menus and implement object-based navigation instead. Since most guests open these on their phones, I designed it with a mobile-first 9:16 aspect ratio to keep the experience feeling like a native app. On the technical side, I integrated Supabase to handle real-time RSVP data and guest messages. I also made sure to include practical features like a background music player and a copy-to-clipboard function for bank details to make things easier for the guests."
        }
      ];
      
      const words = ["My Projects"]
      const words2 = ["About Me"]
      
//--- Aout Me ---


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

{/* Divider Section */}
<div className="py-12 flex justify-center w-full">
  <div 
    className="w-full max-w-7xl h-5 z-10 bg-linear-to-r from-[#79e0e0]/30 via-[#987ed0]/30 to-[#e8f47e]/30"
  />
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

          {/* Divider Section */}
<div className="py-12 flex justify-center w-full">
  <div 
    className="w-full max-w-7xl h-5 z-10 bg-linear-to-r from-[#79e0e0]/30 via-[#987ed0]/30 to-[#e8f47e]/30"
  />
</div>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16">
        <div className="flex justify-center items-center mb-2 px-4">
          <h2 className="masked-text text-5xl md:text-6xl array tracking-tight text-center">
            <Typewriter words={words2} speed={150} delayBetweenWords={7000}  cursor={true} cursorChar="|"/>
            </h2>
            </div>
            <AboutMe />
            </section>
          </div>
          <div className="relative z-10 w-full">
      <Footer />
      </div>
          </div>
        );
      }