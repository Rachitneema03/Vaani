import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, FileText, CheckCircle, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Telemetry() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    // Reveal cards
    tl.fromTo('.stat-card',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );

    // Number counters
    const obj = { latency: 0, sources: 0, rate: 0, stages: 0 };
    tl.to(obj, {
      latency: 124,
      sources: 42,
      rate: 98.7,
      stages: 3,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if(document.getElementById('stat-latency')) document.getElementById('stat-latency').innerText = Math.round(obj.latency);
        if(document.getElementById('stat-sources')) document.getElementById('stat-sources').innerText = Math.round(obj.sources);
        if(document.getElementById('stat-rate')) document.getElementById('stat-rate').innerText = obj.rate.toFixed(1);
        if(document.getElementById('stat-stages')) document.getElementById('stat-stages').innerText = '0' + Math.round(obj.stages);
      }
    }, "-=0.3");

  }, { scope: container });

  return (
    <div ref={container} className="col-span-12 md:col-span-6 lg:col-span-3 border-r border-[#E5DECC] p-8 md:p-12 relative flex flex-col justify-between">
      <div>
        <h3 className="font-mono text-xl tracking-tight font-medium mb-1">TELEMETRY</h3>
        <div className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase mb-8">LIVE STATS</div>
        
        <div className="grid grid-cols-2 gap-4">
          
          {/* Latency */}
          <div className="stat-card border border-[#DCD2BB] rounded-xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:border-[#A88647] hover:shadow-md transition-all">
            <div className="flex items-center gap-1 text-[#8B663A] mb-1">
              <Zap size={14} fill="currentColor" />
              <span className="font-mono text-xl font-bold"><span id="stat-latency">0</span><span className="text-[10px]">ms</span></span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#807B73]">AVG LATENCY</div>
          </div>

          {/* Sources */}
          <div className="stat-card border border-[#DCD2BB] rounded-xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:border-[#A88647] hover:shadow-md transition-all">
            <div className="flex items-center gap-1 text-[#8B663A] mb-1">
              <FileText size={14} />
              <span className="font-mono text-xl font-bold"><span id="stat-sources">0</span><span className="text-sm">+</span></span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#807B73]">SOURCES</div>
          </div>

          {/* Retrieval Rate */}
          <div className="stat-card border border-[#DCD2BB] rounded-xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:border-[#A88647] hover:shadow-md transition-all">
            <div className="flex items-center gap-1 text-[#232220] mb-1">
              <CheckCircle size={14} />
              <span className="font-mono text-xl font-bold"><span id="stat-rate">0.0</span><span className="text-sm">%</span></span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#807B73]">RETRIEVAL RATE</div>
          </div>

          {/* Stages */}
          <div className="stat-card border border-[#DCD2BB] rounded-xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:border-[#A88647] hover:shadow-md transition-all">
            <div className="flex items-center gap-1 text-[#232220] mb-1">
              <Layers size={14} />
              <span className="font-mono text-xl font-bold" id="stat-stages">00</span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#807B73]">RETRIEVAL STAGES</div>
          </div>

        </div>
      </div>

      {/* Live Stamp */}
      <div className="absolute bottom-6 right-6 opacity-30">
         <div className="w-16 h-16 rounded-full border border-dashed border-[#8B663A] flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <div className="font-mono text-[8px] text-[#8B663A] tracking-widest uppercase">LIVE</div>
         </div>
      </div>
    </div>
  );
}
