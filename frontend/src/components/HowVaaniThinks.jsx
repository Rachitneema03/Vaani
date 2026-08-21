import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, Database, FileText, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Note } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 'query', icon: Search, title: 'USER QUERY', desc: 'Your question' },
  { id: 'retrieve', icon: Database, title: 'RETRIEVE', desc: 'Search relevant knowledge' },
  { id: 'ground', icon: FileText, title: 'GROUND', desc: 'Collect content from sources' },
  { id: 'generate', icon: Sparkles, title: 'GENERATE', desc: 'Blend facts into answer' },
  { id: 'response', icon: MessageSquare, title: 'RESPONSE', desc: 'Back to you' },
];

export default function HowVaaniThinks() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.pipeline-step',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' }
    );
    
    tl.fromTo('.pipeline-arrow',
      { width: 0, opacity: 0 },
      { width: 24, opacity: 1, duration: 0.3, stagger: 0.15, ease: 'power2.out' },
      "-=0.6" // overlapping start
    );

  }, { scope: container });

  return (
    <div ref={container} className="col-span-12 lg:col-span-7 bg-[#F5F2EA] lg:border-r border-b lg:border-b-0 border-[#E5DECC] p-6 sm:p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-between">
      
      <div>
        <h3 className="font-mono text-xl tracking-tight font-medium mb-1">HOW VAANI THINKS</h3>
        <div className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase mb-12">RAG PIPELINE</div>
        
        <div className="flex items-start justify-between flex-wrap gap-y-8 lg:flex-nowrap w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="pipeline-step group flex flex-col items-center flex-1 min-w-[80px] max-w-[100px] relative cursor-default">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-[#DCD2BB] flex items-center justify-center bg-white transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#A88647] group-hover:shadow-md mb-4">
                  <step.icon className="text-[#8B663A] w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="text-center w-full">
                  <div className="font-mono text-xs font-semibold tracking-tight text-[#232220]">{step.title}</div>
                  <div className="font-sans text-[10px] text-[#807B73] mt-1 leading-tight">{step.desc}</div>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="pipeline-arrow hidden md:flex items-center justify-center pt-8 overflow-hidden">
                  <ArrowRight className="text-[#DCD2BB] w-6 h-6" strokeWidth={1} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-12 font-mono text-[11px] text-[#6b6375] max-w-[300px] leading-relaxed relative">
        Vani retrieves real context from our knowledge base, grounds the information and then generates accurate, relevant answers.
        
        {/* Little decorative plant/note near bottom right of this box */}
        <div className="absolute right-[-40px] bottom-[-20px] opacity-80 pointer-events-none hidden md:block">
           <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 100 Q 50 60 20 40 Q 50 60 50 20 Q 50 60 80 40 Q 50 60 50 100" stroke="#8B663A" strokeWidth="2" fill="none"/>
           </svg>
        </div>
      </div>
    </div>
  );
}
