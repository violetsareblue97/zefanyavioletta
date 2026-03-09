import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MousePointer2, ArrowRight } from 'lucide-react';
import { ShareholderReports } from "@/components/ui/carousel";
import { type Report } from "@/components/ui/carousel";


// --- Types ---

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number; // For some organic oscillation
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

// --- Configuration Constants ---

const PARTICLE_DENSITY = 0.00015; // Particles per pixel squared (adjust for density)
const BG_PARTICLE_DENSITY = 0.00005; // Less dense for background
const MOUSE_RADIUS = 180; // Radius of mouse influence
const RETURN_SPEED = 0.08; // How fast particles fly back to origin (spring constant)
const DAMPING = 0.90; // Friction (velocity decay)
const REPULSION_STRENGTH = 1.2; // Multiplier for mouse push force

// --- Helper Functions ---

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Components ---

const AntiGravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mutable state refs to avoid re-renders during animation loop
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Initialize Particles
  const initParticles = useCallback((width: number, height: number) => {
    // 1. Main Interactive Particles
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      newParticles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1, 2.5), 
        color: Math.random() > 0.9 ? '#f1e50e' : '#ffffff', 
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = newParticles;

    // 2. Background Ambient Particles (Stars/Dust)
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const newBgParticles: BackgroundParticle[] = [];
    
    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Very slow drift
        vy: (Math.random() - 0.5) * 0.2,
        size: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2 // For twinkling offset
      });
    }
    backgroundParticlesRef.current = newBgParticles;
  }, []); 

  // Animation Loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Background Effects ---
    
    // 1. Pulsating Radial Glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pulseSpeed = 0.0008;
    // Oscillates between 0.05 and 0.12 opacity
    const pulseOpacity = Math.sin(time * pulseSpeed) * 0.035 + 0.085; 
    
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7
    );
    gradient.addColorStop(0, `rgba(66, 133, 244, ${pulseOpacity})`); // Faint Google Blue
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Background Particles (Drifting Stars)
    const bgParticles = backgroundParticlesRef.current;
    ctx.fillStyle = "#ffffff";
    
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around screen
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Twinkle effect
      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5; // 0 to 1
      const currentAlpha = p.alpha * (0.3 + 0.7 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0; // Reset alpha for foreground

    // --- Main Foreground Physics ---

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Phase 1: Apply Forces (Mouse & Spring)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // 1. Calculate Distance to Mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 2. Mouse Repulsion Force
      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS; 
        
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * 5; 
        p.vy -= forceDirectionY * repulsion * 5;
      }

      // 3. Spring Force (Return to Origin)
      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;
      
      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;
    }

    // Phase 2: Resolve Collisions
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          
          if (dist > 0.01) { // Avoid division by zero
            const nx = dx / dist; // Normal X
            const ny = dy / dist; // Normal Y

            // Static Resolution: Push particles apart so they don't overlap
            const overlap = minDist - dist;
            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            p1.x -= pushX;
            p1.y -= pushY;
            p2.x += pushX;
            p2.y += pushY;

            // Dynamic Resolution: Elastic Collision
            // Relative velocity
            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;

            // Calculate velocity along the normal
            // Dot product of velocity difference and normal direction
            const velocityAlongNormal = dvx * nx + dvy * ny;

            // Only bounce if they are moving towards each other
            if (velocityAlongNormal > 0) {
              const m1 = p1.size; // Use size as mass proxy
              const m2 = p2.size;
              const restitution = 0.85; // Bounciness (1 is perfectly elastic)

              // Impulse scalar
              const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1/m1 + 1/m2);

              // Apply impulse
              const impulseX = impulseMagnitude * nx;
              const impulseY = impulseMagnitude * ny;

              p1.vx += impulseX / m1;
              p1.vy += impulseY / m1;
              p2.vx -= impulseX / m2;
              p2.vy -= impulseY / m2;
            }
          }
        }
      }
    }

    // Phase 3: Integration & Drawing
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physics Update
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      // Drawing
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      
      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + velocity * 0.1, 1); 
      
      ctx.fillStyle = p.color === '#ffffff' 
        ? `rgba(255, 255, 255, ${opacity})` 
        : p.color;
      
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set actual size in memory (scaled to account for extra pixel density)
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        
        // Make it visible size
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        // Normalize coordinate system to use CSS pixels
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        // Re-init particles for new dimensions
        initParticles(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 overflow-hidden bg-black cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

const Navigation: React.FC = () => {
    return (
        <nav className="absolute top-0 w-full z-20 flex justify-center items-center p-6 md:p-8">
            <div className=" khand md:flex space-x-8 text-sm" style={{color: '#e8f47e'}}>
                <a href="#" className="hover:text-white transition-colors">Contacts</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#" className="hover:text-white transition-colors">About</a>
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
                    Experience the fluidity of data. A WebGL-inspired particle simulation running entirely on 2D Canvas for maximum compatibility and performance.
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
                    <a href="mailto:zefanya97@gmail.com" className="px-6 py-3 border border-[#e8f47e] text-[#e8f47e] rounded-full font-bold hover:bg-[#e8f47e] hover:text-black transition-all">
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
          imageSrc: "./public/libraria-logo.png",
          projectname: "Libraria - Bookstore Management System",
          link: "https://libraria-nu.vercel.app/",
          desc: "A digital Library management web based system." + "\n" + "Source Code" + <a href="https://github.com/violetsareblue97/Libraria" target="_blank" rel="noopener noreferrer">here</a>,
        },
        {
          id: "q4fy25",
          imageSrc: "https://b.zmtcdn.com/investor-relations/1199bb1a7e905267f520ace8be13fdad_1746093395.png",
          projectname: "Q4FY25 - Financial Report",
          link: "https://example.com/q4fy25-report",
          desc: ""
        }
      ];

// --- Main App Component ---

export default function App() {
  return (
    <div className="relative z-10">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-screen w-full">
         <AntiGravityCanvas />
         <HeroContent />
      </div>

      {/* Projects Section */}
      <section id="projects" className="relative z-10">
        <h2 className="text-5xl mb-8 text-[#987ed0]">My Projects</h2>
          <ShareholderReports reports={reportsData} />      
            </section>
            
          </div>
        );
      }