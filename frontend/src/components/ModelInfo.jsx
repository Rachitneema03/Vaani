import React from 'react';
import { Tape } from './Decorations';

export default function ModelInfo() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-2 p-8 md:p-12 relative flex flex-col group overflow-hidden">
      
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNDQ0MiLz48L3N2Zz4=')] opacity-[0.15]"></div>

      <div className="relative z-10 h-full flex flex-col">
        <h3 className="font-mono text-xl tracking-tight font-medium mb-8">MODEL INFO</h3>
        
        <div className="flex-1 flex flex-col justify-center space-y-6">
          
          <div className="group/item flex flex-col gap-1 cursor-default transition-transform hover:translate-x-1 duration-300">
            <span className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase">MODEL</span>
            <span className="font-mono text-sm text-[#232220] font-medium flex items-center gap-2">
              Vaani AI (RAG)
              <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#A88647] text-xs">← Custom</span>
            </span>
          </div>

          <div className="group/item flex flex-col gap-1 cursor-default transition-transform hover:translate-x-1 duration-300">
            <span className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase">ARCHITECTURE</span>
            <span className="font-mono text-sm text-[#232220] font-medium">RAG + LLM</span>
          </div>

          <div className="group/item flex flex-col gap-1 cursor-default transition-transform hover:translate-x-1 duration-300 relative">
            <span className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase">EMBEDDING MODEL</span>
            <span className="font-mono text-sm text-[#232220] font-medium">text-embedding-3-small</span>
            
            {/* Technical annotation line */}
            <div className="absolute -left-4 top-1/2 w-2 h-[1px] bg-[#DCD2BB] opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
          </div>

          <div className="group/item flex flex-col gap-1 cursor-default transition-transform hover:translate-x-1 duration-300">
            <span className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase">VECTOR DB</span>
            <span className="font-mono text-sm text-[#232220] font-medium">Pinecone</span>
          </div>

          <div className="group/item flex flex-col gap-1 cursor-default transition-transform hover:translate-x-1 duration-300">
            <span className="font-mono text-[10px] text-[#807B73] tracking-widest uppercase">LAST UPDATED</span>
            <span className="font-mono text-sm text-[#232220] font-medium">8 May 2025</span>
          </div>
          
        </div>
      </div>

      {/* Edge decoration */}
      <div className="absolute right-[-60px] top-10 opacity-[0.05] pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <path d="M 0 50 Q 50 0 100 50 T 200 50" stroke="black" strokeWidth="1" fill="none" />
          <path d="M 0 60 Q 50 10 100 60 T 200 60" stroke="black" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Palm leaf hint top right */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] scale-150 rotate-45 pointer-events-none">
         <svg viewBox="0 0 24 24" fill="currentColor" height="200" width="200">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
         </svg>
      </div>
    </div>
  );
}
