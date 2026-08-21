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
    // Slight downward parallax movement for video background when scrolling past hero
    gsap.to(bgRef.current, {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col z-0">
      {/* Background Video (Streamable Embed) */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
        <iframe
          src="https://streamable.com/e/dgog55?autoplay=1&muted=1&nocontrols=1&loop=1"
          className="absolute w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
          allow="autoplay; encrypted-media"
          title="Hero Background Video"
        />
      </div>



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
