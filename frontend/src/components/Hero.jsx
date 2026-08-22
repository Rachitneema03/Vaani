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
    // Parallax effect for the entire hero section so the second section overlaps it
    gsap.to(container.current, {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Mobile-only: Smoothly transition "VAANI AI" title to top-left corner as logo on scroll
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      gsap.to('.hero-title', {
        x: '-28vw',
        y: '-32vh',
        scale: 0.32,
        letterSpacing: '0.15em',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'top -50%',
          scrub: 0.5,
        }
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden flex flex-col z-0">
      {/* Background Video */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
        >
          <source src="https://res.cloudinary.com/dbg7xnr63/video/upload/v1787412202/IMG_0747_fgdr53.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <h1 className="hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white/90 drop-shadow-lg mb-4 sm:mb-6 tracking-tight" style={{ color: '#E8D5B5' }}>
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
