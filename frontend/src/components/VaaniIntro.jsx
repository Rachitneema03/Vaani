import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Tape } from './Decorations';
import VoiceShader from './VoiceShader';

gsap.registerPlugin(ScrollTrigger);

export default function VaaniIntro() {
  const container = useRef(null);
  const [mode, setMode] = useState('listening'); // listening, thinking, speaking
  const [displayedText, setDisplayedText] = useState('');
  
  const fullText = "I would like to get details on the weather, local cuisine, and the best hidden beaches in Goa.";

  useGSAP(() => {
    // Pinning the section so it becomes the highlight
    ScrollTrigger.create({
      trigger: container.current,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
    });

    gsap.fromTo('.intro-left',
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 70%' }
      }
    );

    gsap.fromTo('.intro-right',
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 70%' }
      }
    );
  }, { scope: container });

  // Simulate typing effect when mode switches to 'speaking'
  useEffect(() => {
    if (mode === 'speaking') {
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setMode('listening'), 2000); // go back to listening after done
        }
      }, 40);
      return () => clearInterval(interval);
    } else if (mode === 'listening') {
      setDisplayedText('...');
    } else if (mode === 'thinking') {
      setDisplayedText('Processing query...');
      // Auto transition to speaking after thinking
      const to = setTimeout(() => setMode('speaking'), 2000);
      return () => clearTimeout(to);
    }
  }, [mode]);

  return (
    <section id="vaani-intro" ref={container} className="relative w-full h-screen bg-[#FAF9F6] pt-24 z-10 -mt-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-t-3xl flex items-center">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 h-full pb-16">
        
        {/* LEFT: Image / Shader */}
        <div className="intro-left relative w-full md:w-1/2 flex justify-center">
          <div className="relative inline-block">
            <div className="w-[280px] md:w-[380px] aspect-square rounded-2xl overflow-hidden shadow-xl p-4 bg-[#1A2E20]">
              <VoiceShader mode={mode} />
            </div>
            
            {/* Decorations */}
            <Tape className="top-[-10px] left-1/2 -translate-x-1/2" />
            
            <div className="absolute -left-6 top-10 bg-[#E5DECC] text-[#8B663A] text-[10px] font-mono tracking-widest uppercase p-2 border border-[#8B663A]/20 shadow-sm rotate-[-4deg]">
              RAG-POWERED<br/>VOICE AGENT
              <Tape className="top-[-8px] right-[-10px] w-8 h-4 rotate-[15deg]" />
            </div>

            {/* Manual Toggles */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
              <button onClick={() => setMode('listening')} className={`w-10 h-10 border ${mode === 'listening' ? 'bg-[#8B663A] border-[#8B663A]' : 'bg-[#DCD2BB] border-transparent'} transition-colors shadow-sm rounded-sm`} title="Listening Mode"></button>
              <button onClick={() => setMode('thinking')} className={`w-10 h-10 border ${mode === 'thinking' ? 'bg-[#8B663A] border-[#8B663A]' : 'bg-[#DCD2BB] border-transparent'} transition-colors shadow-sm rounded-sm`} title="Thinking Mode"></button>
              <button onClick={() => setMode('speaking')} className={`w-10 h-10 border ${mode === 'speaking' ? 'bg-[#8B663A] border-[#8B663A]' : 'bg-[#DCD2BB] border-transparent'} transition-colors shadow-sm rounded-sm`} title="Speaking Mode"></button>
            </div>
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="intro-right w-full md:w-1/2 text-left">
          <div className="font-sans text-[#A88647] uppercase tracking-[0.2em] text-sm mb-4 font-semibold">
            THE PHILOSOPHY
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-[#232220] mb-8">
            Hi, I'm Vaani
          </h2>
          <p className="font-sans text-[#4A4A4A] text-lg leading-relaxed mb-8">
            Your personal assistant for Goa. What would you like help with?
          </p>
          <div className="pl-6 border-l-2 border-[#A88647] italic font-serif text-[#6C5B4B] text-2xl min-h-[80px]">
            "{displayedText}"
            {mode === 'speaking' && <span className="animate-pulse">|</span>}
          </div>
          <div className="mt-12 flex gap-2 justify-center md:justify-start">
             <div className={`w-12 h-1 transition-colors ${mode === 'listening' ? 'bg-[#8B663A]' : 'bg-[#DCD2BB]'}`}></div>
             <div className={`w-12 h-1 transition-colors ${mode === 'thinking' ? 'bg-[#8B663A]' : 'bg-[#DCD2BB]'}`}></div>
             <div className={`w-12 h-1 transition-colors ${mode === 'speaking' ? 'bg-[#8B663A]' : 'bg-[#DCD2BB]'}`}></div>
          </div>
        </div>

      </div>
    </section>
  );
}
