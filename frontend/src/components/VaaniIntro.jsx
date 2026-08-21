import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Tape } from './Decorations';
import VoiceShader from './VoiceShader';

gsap.registerPlugin(ScrollTrigger);

export default function VaaniIntro() {
  const container = useRef(null);
  
  // 3 States: 'idle' (Shader 1) -> 'listening' (Shader 2) -> 'speaking' (Shader 3)
  const [mode, setMode] = useState('idle'); 
  const [transcript, setTranscript] = useState('');
  const [displayedText, setDisplayedText] = useState('Click the shader to start speaking...');
  const [activeCardIndex, setActiveCardIndex] = useState(0); // 0: Beige Cue Card, 1: Carved Wood Card, 2: Sea Beach Card

  const recognitionRef = useRef(null);

  useGSAP(() => {
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

  // Web Speech API Initialization
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        setDisplayedText(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (mode === 'listening') {
          setDisplayedText('Listening... (speak now into your microphone)');
        }
      };

      recognition.onend = () => {
        if (mode === 'listening') {
          transitionToSpeaking();
        }
      };

      recognitionRef.current = recognition;
    }
  }, [mode]);

  // Handle Shader Clicks for the 3-step transition
  const handleShaderClick = () => {
    if (mode === 'idle') {
      setMode('listening');
      setTranscript('');
      setDisplayedText('Listening... Say something about Goa!');
      if (recognitionRef.current) {
        try { recognitionRef.current.start(); } catch (e) {}
      }
    } else if (mode === 'listening') {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      transitionToSpeaking();
    } else if (mode === 'speaking') {
      setMode('idle');
      setDisplayedText('Click the shader to start speaking...');
    }
  };

  const transitionToSpeaking = () => {
    setMode('speaking');
    const userQuery = transcript || "Can you recommend the best beaches and local cuisine in Goa?";
    setDisplayedText(`Thinking & Processing: "${userQuery}"...`);

    setTimeout(() => {
      setDisplayedText(`"Vaani AI: Here are top spots in Goa based on your query: Morjim for quiet sunsets, Palolem for beaches, and Ritz Classic for authentic Konkani thali!"`);
    }, 2200);
  };

  // Cycle card stack when clicking topmost card
  const handleCardClick = () => {
    setActiveCardIndex((prev) => (prev + 1) % 3);
  };

  const currentTranscribedText = transcript || displayedText;

  // Render Card 1: Vintage Off-White Beige Card
  const renderCard1 = (positionStyle, zIndex, onClick) => (
    <div
      onClick={onClick}
      style={positionStyle}
      className={`absolute inset-x-0 top-0 p-6 bg-[#F5EFEB] rounded-xl border-4 border-[#6C4E31]/40 shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none ${zIndex}`}
    >
      <Tape className="top-[-10px] left-8 z-10" />
      <Tape className="bottom-[-10px] right-8 z-10 rotate-90" />

      <div className="flex items-center justify-between mb-3 border-b border-[#D8C4B6] pb-2">
        <span className="text-[10px] font-mono tracking-widest text-[#6C4E31] uppercase font-bold flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${mode === 'listening' ? 'bg-[#50ffeb] animate-ping' : 'bg-[#6C4E31]'}`}></span>
          {mode === 'listening' ? 'TRANSCRIBING LIVE...' : '1. BEIGE VINTAGE CUE CARD'}
        </span>
        <span className="text-[10px] font-mono text-[#8C6D53]">CARD 01/03</span>
      </div>

      <div className="font-serif text-[#3D2C1E] text-base md:text-lg leading-relaxed italic min-h-[85px] relative">
        "{currentTranscribedText}"
        {mode === 'listening' && <span className="inline-block w-2 h-5 bg-[#50ffeb] ml-1 animate-pulse"></span>}
      </div>

      <div className="mt-3 pt-2 border-t border-[#D8C4B6]/60 flex items-center justify-between text-[11px] font-sans text-[#7E634E]">
        <span>Theme: Off-White Canvas</span>
        <span className="font-mono text-[9px] bg-[#E3D5CA] px-2 py-0.5 rounded border border-[#6C4E31]/20">TAP TO SLIDE →</span>
      </div>
    </div>
  );

  // Render Card 2: Carved Dark Wood Card
  const renderCard2 = (positionStyle, zIndex, onClick) => (
    <div
      onClick={onClick}
      style={positionStyle}
      className={`absolute inset-x-0 top-0 p-6 bg-[#2B1B17] rounded-xl border-4 border-[#8B5A2B] shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none text-[#E8D5B5] ${zIndex}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D261C] to-[#1F120E] opacity-90 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-between mb-3 border-b border-[#8B5A2B]/40 pb-2">
        <span className="text-[10px] font-mono tracking-widest text-[#D4A373] uppercase font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
          2. CARVED WOOD CANVAS
        </span>
        <span className="text-[10px] font-mono text-[#A27B5C]">CARD 02/03</span>
      </div>

      <div className="relative z-10 font-serif text-[#F3E9DC] text-base md:text-lg leading-relaxed italic min-h-[85px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        "{currentTranscribedText}"
      </div>

      <div className="relative z-10 mt-3 pt-2 border-t border-[#8B5A2B]/40 flex items-center justify-between text-[11px] font-sans text-[#D4A373]">
        <span>Theme: Rustic Carved Teak Wood</span>
        <span className="font-mono text-[9px] bg-[#3D261C] px-2 py-0.5 rounded border border-[#8B5A2B]/50">TAP TO SLIDE →</span>
      </div>
    </div>
  );

  // Render Card 3: Soft Sea + Beach Vibed Card
  const renderCard3 = (positionStyle, zIndex, onClick) => (
    <div
      onClick={onClick}
      style={positionStyle}
      className={`absolute inset-x-0 top-0 p-6 bg-gradient-to-br from-[#E0F4F1] via-[#F4EFEA] to-[#D5E8E4] rounded-xl border-4 border-[#4EA896]/50 shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none text-[#1C4E44] ${zIndex}`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-[#A0D2C8] pb-2">
        <span className="text-[10px] font-mono tracking-widest text-[#2C7A6B] uppercase font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4EA896] animate-pulse"></span>
          3. SEA & BEACH WAVE CANVAS
        </span>
        <span className="text-[10px] font-mono text-[#2C7A6B]">CARD 03/03</span>
      </div>

      <div className="font-serif text-[#164038] text-base md:text-lg leading-relaxed italic min-h-[85px]">
        "{currentTranscribedText}"
      </div>

      <div className="mt-3 pt-2 border-t border-[#A0D2C8]/70 flex items-center justify-between text-[11px] font-sans text-[#2C7A6B]">
        <span>Theme: Coastal Goan Wave</span>
        <span className="font-mono text-[9px] bg-[#CBE6E1] px-2 py-0.5 rounded border border-[#4EA896]/30">TAP TO SLIDE →</span>
      </div>
    </div>
  );

  // Calculate stack positions and z-index offsets based on activeCardIndex
  const getCardProps = (cardIndex) => {
    // Relative position in stack: 0 (front), 1 (middle), 2 (back)
    const stackPos = (cardIndex - activeCardIndex + 3) % 3;

    if (stackPos === 0) {
      return {
        style: { transform: 'translate(0px, 0px) rotate(2.5deg) scale(1)', opacity: 1 },
        zIndex: 'z-30'
      };
    } else if (stackPos === 1) {
      return {
        style: { transform: 'translate(14px, 12px) rotate(-1.5deg) scale(0.97)', opacity: 0.92 },
        zIndex: 'z-20'
      };
    } else {
      return {
        style: { transform: 'translate(26px, 24px) rotate(4deg) scale(0.94)', opacity: 0.82 },
        zIndex: 'z-10'
      };
    }
  };

  return (
    <section id="vaani-intro" ref={container} className="relative w-full h-screen bg-[#FAF9F6] pt-24 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-t-3xl flex items-center overflow-hidden">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 h-full pb-16 px-4">
        
        {/* LEFT: Voice Shader Container (Clickable Box) */}
        <div className="intro-left relative w-full md:w-1/2 flex justify-center max-h-[420px]">
          <div className="relative inline-block w-full max-w-[360px] md:max-w-[400px] aspect-square">
            
            {/* Box Container for Shader */}
            <div 
              onClick={handleShaderClick}
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl p-4 bg-[#1A2E20] border-4 border-[#8B663A]/30 hover:border-[#8B663A]/60 transition-all duration-500 cursor-pointer group relative"
            >
              <VoiceShader mode={mode} />

              {/* Click Hint Overlay */}
              <div className="absolute inset-x-0 top-3 text-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-sans tracking-widest text-[#50ffeb] bg-black/60 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                  Click to transition shader
                </span>
              </div>
            </div>
            
            {/* Decorations */}
            <Tape className="top-[-10px] left-1/2 -translate-x-1/2 z-20" />
            
            <div className="absolute -left-4 top-8 bg-[#E5DECC] text-[#8B663A] text-[10px] font-mono tracking-widest uppercase p-2 border border-[#8B663A]/20 shadow-sm rotate-[-4deg] pointer-events-none z-20">
              VOICE-POWERED<br/>RAG AGENT
              <Tape className="top-[-8px] right-[-10px] w-8 h-4 rotate-[15deg]" />
            </div>

            {/* 3 Step Manual Controls */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button 
                onClick={() => setMode('idle')} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'idle' ? 'bg-[#1A2E20] text-[#50ffeb] border-[#50ffeb]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                1. Shader 1 (Idle)
              </button>
              <button 
                onClick={() => setMode('listening')} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'listening' ? 'bg-[#1A2E20] text-[#50ffeb] border-[#50ffeb]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                2. Shader 2 (Mic)
              </button>
              <button 
                onClick={() => setMode('speaking')} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'speaking' ? 'bg-[#FF9900]/20 text-[#FFD700] border-[#FFD700]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                3. Shader 3 (AI)
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: Text & Transcribed Stacked Cards Display */}
        <div className="intro-right w-full md:w-1/2 text-left flex flex-col justify-center">
          <div className="font-sans text-[#A88647] uppercase tracking-[0.2em] text-xs md:text-sm mb-3 font-semibold">
            THE PHILOSOPHY
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#232220] mb-4">
            Hi, I'm Vaani
          </h2>
          <p className="font-sans text-[#4A4A4A] text-sm md:text-base leading-relaxed mb-6">
            Speak into the microphone. Tap the top card to cycle between styled canvas themes.
          </p>

          {/* 3 Stacked Transcribed Cards Container */}
          <div className="relative w-full max-w-md h-[210px] mt-2">
            {renderCard1(getCardProps(0).style, getCardProps(0).zIndex, handleCardClick)}
            {renderCard2(getCardProps(1).style, getCardProps(1).zIndex, handleCardClick)}
            {renderCard3(getCardProps(2).style, getCardProps(2).zIndex, handleCardClick)}
          </div>

          {/* Progress Indicator Bars synced to 3 Stacked Cards */}
          <div className="mt-8 flex gap-3 items-center">
            <button
              onClick={() => setActiveCardIndex(0)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeCardIndex === 0 ? 'w-14 bg-[#6C4E31] shadow-md' : 'w-8 bg-[#DCD2BB] hover:bg-[#A88647]/50'
              }`}
              title="Card 1: Off-White Beige"
            />
            <button
              onClick={() => setActiveCardIndex(1)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeCardIndex === 1 ? 'w-14 bg-[#8B5A2B] shadow-md' : 'w-8 bg-[#DCD2BB] hover:bg-[#A88647]/50'
              }`}
              title="Card 2: Carved Dark Wood"
            />
            <button
              onClick={() => setActiveCardIndex(2)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeCardIndex === 2 ? 'w-14 bg-[#4EA896] shadow-md' : 'w-8 bg-[#DCD2BB] hover:bg-[#A88647]/50'
              }`}
              title="Card 3: Sea & Beach Wave"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
