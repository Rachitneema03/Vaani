import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Users, Activity, Heart, Play } from 'lucide-react';
import { Tape } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

export default function TeamProcess() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      }
    });

    tl.fromTo('.team-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.process-step',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' },
      "-=0.4"
    )
    .fromTo('.team-video',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.6"
    );

  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#FAF9F6] py-24 z-10 relative border-t border-[#E5DECC]">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* LEFT: Process */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="team-header mb-16 relative">
            <h2 className="font-serif text-5xl md:text-6xl text-[#8B663A] leading-none mb-2">The Team &amp; Process</h2>
            <h3 className="font-serif text-5xl md:text-6xl text-[#232220] italic leading-none mb-6">Behind the Model</h3>
            <p className="font-sans text-[#807B73] text-sm max-w-sm">
              We are a Team of passionate young builders from IPS, DAVV Indore that also work.
            </p>
            
            {/* Little star decoration */}
            <div className="absolute top-0 right-10 text-[#DCD2BB]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-start relative w-full px-4">
            {/* Dotted connector line */}
            <div className="absolute top-6 left-8 right-8 h-[2px] border-t-2 border-dotted border-[#DCD2BB] -z-10"></div>

            {/* Steps */}
            <div className="process-step flex flex-col items-center text-center max-w-[90px]">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border-2 border-[#DCD2BB] flex items-center justify-center mb-3">
                <Users className="text-[#8B663A] w-5 h-5" />
              </div>
              <h4 className="font-sans text-xs font-semibold text-[#8B663A] uppercase tracking-wider mb-1">Research</h4>
              <p className="font-sans text-[10px] text-[#807B73] leading-tight">Listen to real user needs</p>
            </div>

            <div className="process-step flex flex-col items-center text-center max-w-[90px] relative">
              <Tape className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 z-10" />
              <div className="w-12 h-12 rounded-none bg-[#FAF9F6] border-2 border-[#DCD2BB] flex items-center justify-center mb-3 shadow-sm transform -rotate-2">
                <Activity className="text-[#232220] w-5 h-5" />
              </div>
              <h4 className="font-sans text-xs font-semibold text-[#8B663A] uppercase tracking-wider mb-1">Design</h4>
              <p className="font-sans text-[10px] text-[#807B73] leading-tight">Build with empathy and precision</p>
            </div>

            <div className="process-step flex flex-col items-center text-center max-w-[90px]">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border-2 border-[#DCD2BB] flex items-center justify-center mb-3">
                <Heart className="text-[#8B663A] w-5 h-5" />
              </div>
              <h4 className="font-sans text-xs font-semibold text-[#8B663A] uppercase tracking-wider mb-1">Iterate</h4>
              <p className="font-sans text-[10px] text-[#807B73] leading-tight">Improve with every conversation</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Video */}
        <div className="team-video w-full lg:w-7/12 relative">
          <div className="aspect-video w-full bg-[#1A2E20] rounded-xl overflow-hidden relative shadow-lg group cursor-pointer border border-[#1A2E20]/20">
            <img 
              src="/vintage_video_thumb_1787340530123.jpg" 
              alt="Team Video" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute top-4 left-6 font-mono text-[10px] text-white/80 tracking-widest uppercase">
              TEAM VIDEO
            </div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center text-white bg-black/20 group-hover:bg-black/40 group-hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Goa Stamp Decoration */}
            <div className="absolute bottom-4 left-4 p-2 border border-white/30 text-[8px] font-mono tracking-widest text-white/60 bg-black/20 backdrop-blur-sm -rotate-2">
              GOA<br/>2025<br/>HACKERHOUSE
            </div>
          </div>
          
          {/* External decorative shell */}
          <div className="absolute -bottom-10 -right-8 opacity-[0.8] w-24 h-24 pointer-events-none drop-shadow-md z-20">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,80 Q30,40 50,20 Q70,40 90,80 Q50,90 10,80 Z" fill="#DCD2BB" stroke="#C4B89D" strokeWidth="1"/>
                <path d="M30,83 Q40,50 50,20 M70,83 Q60,50 50,20" stroke="#C4B89D" strokeWidth="1" fill="none"/>
             </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
