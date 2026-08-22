import React from 'react';

export const Tape = ({ className, style }) => (
  <div 
    className={`absolute bg-white/40 shadow-sm border border-white/50 backdrop-blur-sm ${className}`}
    style={{
      width: '60px',
      height: '20px',
      transform: 'rotate(-2deg)',
      ...style
    }}
  >
    <div className="w-full h-full bg-[#E5DECC]/80" style={{
      maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'black\' /%3E%3C/svg%3E")',
      WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'black\' /%3E%3C/svg%3E")'
    }}></div>
  </div>
);

export const GoaStamp = ({ className, style }) => (
  <div 
    className={`absolute border-2 border-white/40 p-2 flex flex-col items-center justify-center font-mono text-white/70 tracking-widest text-[10px] uppercase leading-tight ${className}`}
    style={{
      transform: 'rotate(-5deg)',
      width: '80px',
      height: '60px',
      backgroundImage: 'radial-gradient(circle, transparent 2px, rgba(255,255,255,0.1) 3px)',
      backgroundSize: '8px 8px',
      backgroundPosition: '-4px -4px',
      ...style
    }}
  >
    <div className="font-serif text-lg text-white/90">GOA</div>
    <div>2025</div>
    <div className="text-[7px] mt-1 text-white/50">HACKERHOUSE</div>
  </div>
);

export const Note = ({ text, className, style }) => (
  <div 
    className={`absolute bg-[#F2EFE9] shadow-md border border-[#E5DECC] p-4 font-serif italic text-[#6C5B4B] text-sm md:text-base leading-relaxed ${className}`}
    style={{
      transform: 'rotate(2deg)',
      maxWidth: '180px',
      ...style
    }}
  >
    <Tape style={{ top: '-10px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }} />
    {text}
  </div>
);
