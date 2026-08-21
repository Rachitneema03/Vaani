import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A2E20] text-white pt-24 pb-12 relative overflow-hidden z-10 border-t-4 border-[#8B663A]">
      
      {/* Topographic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50 M0 60 Q 25 40 50 60 T 100 60 M0 70 Q 25 50 50 70 T 100 70' stroke='white' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }}></div>

      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        
        {/* LEFT: Decor / Branding */}
        <div className="relative w-full md:w-1/2">
          {/* Postcard drawing illustration */}
          <div className="w-32 h-40 border border-white/20 rounded bg-white/5 rotate-[-5deg] p-3 flex flex-col justify-between backdrop-blur-sm relative">
             {/* Small tape */}
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/30 backdrop-blur-md border border-white/20 rotate-[3deg]"></div>
             
             {/* Palm tree drawing */}
             <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-40">
                <path d="M50 90 Q40 60 45 30 M45 30 Q20 40 10 60 M45 30 Q30 20 40 10 M45 30 Q60 10 80 20 M45 30 Q70 40 90 60" stroke="white" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="90" r="2" fill="white"/>
             </svg>
          </div>
          
          {/* Scattered stars */}
          <div className="absolute top-0 right-10 text-[#A88647]">✦</div>
          <div className="absolute bottom-10 -right-4 text-[#A88647] text-xs">✧</div>
          
          {/* Contour wavy lines floating left */}
          <div className="absolute -bottom-10 -left-20 opacity-10">
            <svg width="300" height="100" viewBox="0 0 300 100">
               <path d="M0,50 Q75,10 150,50 T300,50" stroke="white" strokeWidth="1" fill="none"/>
               <path d="M0,60 Q75,20 150,60 T300,60" stroke="white" strokeWidth="1" fill="none"/>
               <path d="M0,70 Q75,30 150,70 T300,70" stroke="white" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>

        {/* RIGHT: HackerHouse Text */}
        <div className="w-full md:w-1/2 text-left md:text-right flex flex-col items-start md:items-end">
          
          <a href="#" className="group flex items-center gap-4 text-4xl md:text-5xl lg:text-6xl font-serif mb-6 hover:text-[#DCD2BB] transition-colors">
            HackerHouse Goa
            <ArrowRight className="w-8 h-8 opacity-60 group-hover:translate-x-2 group-hover:opacity-100 transition-all" strokeWidth={1} />
          </a>
          
          <p className="font-sans text-white/60 text-sm max-w-sm mb-12">
            It's a hackathon in goa that blah blah blah la di dah doosh doosh
          </p>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-4 h-4 border border-white/40 flex items-center justify-center group-hover:border-white transition-colors bg-black/20">
              <input type="checkbox" className="opacity-0 absolute w-0 h-0" />
            </div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
              I AGREE TO THE PRIVACY POLICY
            </span>
          </label>
        </div>

      </div>
    </footer>
  );
}
