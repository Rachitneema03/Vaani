import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GoaStamp, Note } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Reveal animation
    const tl = gsap.timeline();
    
    tl.fromTo(bgRef.current, 
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      "-=0.6"
    )
    .fromTo('.hero-btn', 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      "-=0.4"
    )
    .fromTo('.hero-deco', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)' },
      "-=0.2"
    );

    // Lock screen scroll effect
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=100%", // Pin for 1 viewport height
      pin: true,
      pinSpacing: false, // Allows next section to slide over
      scrub: 1,
      animation: gsap.timeline()
        .to(contentRef.current, { y: -150, opacity: 0, ease: 'none' })
        .to(bgRef.current, { y: -50, filter: 'brightness(0.7)', ease: 'none' }, 0)
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden flex flex-col z-0">
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero_bg_1787340490865.jpg")' }}
      ></div>

      {/* Navbar overlay */}
      <nav className="relative z-10 w-full flex justify-between items-start p-6 md:p-10 font-sans text-xs uppercase tracking-[0.2em] font-medium text-white mix-blend-difference">
        <div className="flex gap-8">
          <a href="#" className="group flex items-center gap-2 hover:opacity-80 transition-opacity">
            Go to Agent <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#" className="hidden md:block hover:opacity-80 transition-opacity">Latency Info</a>
          <a href="#" className="hidden md:block hover:opacity-80 transition-opacity">The Team</a>
          <a href="#" className="hidden md:block hover:opacity-80 transition-opacity">Hackerhouse Goa</a>
        </div>
        <div className="font-serif text-2xl tracking-widest">VAANI AI</div>
      </nav>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="hero-title font-serif text-6xl md:text-8xl lg:text-9xl text-white/90 drop-shadow-lg mb-6 tracking-tight" style={{ color: '#E8D5B5' }}>
          VAANI AI
        </h1>
        
        <p className="hero-subtitle font-sans text-white/80 max-w-lg mx-auto text-sm md:text-base leading-relaxed mb-10 mix-blend-overlay">
          Embrace the "Golden Light" lifestyle. A curated sanctuary for those who appreciate the intersection of Mediterranean leisure and New Yorker precision.
        </p>

        <div className="flex gap-4">
          <button 
            onClick={() => document.getElementById('vaani-intro')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn btn-primary bg-[#A88647]/90 hover:bg-[#8B663A] backdrop-blur-sm"
          >
            Go to Agents
          </button>
          <button 
            onClick={() => document.getElementById('telemetry-stats')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-btn btn-secondary border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            View Stats
          </button>
        </div>

        {/* Decorations */}
        <GoaStamp className="hero-deco bottom-10 left-10 hidden md:flex" />
        <Note 
          text={<>Voice is the <br/>new interface.<br/><br/>Vaani is the <br/>new intelligence.</>} 
          className="hero-deco bottom-12 right-12 hidden md:block" 
        />
        
        {/* Mobile Swipe Indicator */}
        <div className="hero-btn absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 font-sans text-xs tracking-widest opacity-80 md:hidden animate-pulse">
          <span className="mb-2">↑</span>
          SWIPE TO EXPLORE
        </div>
      </div>
    </section>
  );
}
