import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Tape } from './Decorations';
import VoiceShader from './VoiceShader';

gsap.registerPlugin(ScrollTrigger);

export default function VaaniIntro() {
  const container = useRef(null);
  
  // States:
  const [mode, setMode] = useState('idle'); // 'idle' | 'listening' | 'speaking'
  const [responseState, setResponseState] = useState('idle'); // 'idle' | 'processing' | 'ready'
  const [selectedLang, setSelectedLang] = useState('en'); // 'en' | 'hi'
  const [transcript, setTranscript] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Multilingual RAG Hardcoded Responses (as requested)
  const hardcodedResponses = {
    en: {
      language: "en",
      langName: "English",
      flag: "🇬🇧",
      answer: "Photosynthesis is the process by which plants, some bacteria and some protists use the energy from sunlight to produce glucose from carbon dioxide and water. Oxygen is also formed."
    },
    hi: {
      language: "hi",
      langName: "हिन्दी (Hindi)",
      flag: "🇮🇳",
      answer: "जब चट्टानों में तनाव बढ़ जाता है और वे अचानक खिसकती हैं, तो ऊर्जा तरंगों के रूप में निकलती है। यही तरंगें पृथ्वी की पपड़ी में कंपन पैदा करती हैं, जिसे हम भूकंप के रूप में महसूस करते हैं।"
    }
  };

  const currentQA = hardcodedResponses[selectedLang];

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

  // Web Speech API Initialization with dynamic language
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.onend = () => {
        if (mode === 'listening') {
          transitionToSpeaking();
        }
      };

      recognitionRef.current = recognition;
    }
  }, [mode, selectedLang]);

  // Handle Shader Clicks for the 3-step transition
  const handleShaderClick = () => {
    if (mode === 'idle') {
      setMode('listening');
      setResponseState('idle');
      setTranscript('');
      setUserQuery('');
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
      setResponseState('idle');
      setTranscript('');
      setUserQuery('');
    }
  };

  const transitionToSpeaking = () => {
    setMode('speaking');
    setResponseState('processing');
    const realSpokenQuery = transcript.trim() || "Live voice audio captured via mic";
    setUserQuery(realSpokenQuery);

    setTimeout(() => {
      setResponseState('ready');
    }, 1800);
  };

  // Cycle card stack when clicking topmost card
  const handleCardClick = () => {
    setActiveCardIndex((prev) => (prev + 1) % 3);
  };

  // Real live transcription logic for the prompt card
  const currentTranscribedText = mode === 'listening' 
    ? (transcript || `Listening in ${currentQA.langName}... speak into your mic now`) 
    : (userQuery || (transcript ? transcript : 'Click the shader box to start speaking...'));

  // Render Card 1: Vintage Off-White Beige Card
  const renderCard1 = (positionStyle, zIndex, onClick) => (
    <div
      onClick={onClick}
      style={positionStyle}
      className={`absolute inset-x-0 top-0 p-5 bg-[#F5EFEB] rounded-xl border-4 border-[#6C4E31]/40 shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none ${zIndex}`}
    >
      <Tape className="top-[-10px] left-8 z-10" />
      <Tape className="bottom-[-10px] right-8 z-10 rotate-90" />

      <div className="flex items-center justify-between mb-2 border-b border-[#D8C4B6] pb-1.5">
        <span className="text-[10px] font-mono tracking-widest text-[#6C4E31] uppercase font-bold flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${mode === 'listening' ? 'bg-[#50ffeb] animate-ping' : 'bg-[#6C4E31]'}`}></span>
          {mode === 'listening' ? `TRANSCRIBING LIVE (${selectedLang.toUpperCase()})...` : `1. REAL VOICE INPUT (${selectedLang.toUpperCase()})`}
        </span>
        <span className="text-[10px] font-mono text-[#8C6D53]">CARD 01/03</span>
      </div>

      <div className="font-serif text-[#3D2C1E] text-sm md:text-base leading-relaxed italic min-h-[65px] relative">
        "{currentTranscribedText}"
        {mode === 'listening' && <span className="inline-block w-2 h-4 bg-[#50ffeb] ml-1 animate-pulse"></span>}
      </div>

      <div className="mt-2 pt-1.5 border-t border-[#D8C4B6]/60 flex items-center justify-between text-[10px] font-sans text-[#7E634E]">
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
      className={`absolute inset-x-0 top-0 p-5 bg-[#2B1B17] rounded-xl border-4 border-[#8B5A2B] shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none text-[#E8D5B5] ${zIndex}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3D261C] to-[#1F120E] opacity-90 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-between mb-2 border-b border-[#8B5A2B]/40 pb-1.5">
        <span className="text-[10px] font-mono tracking-widest text-[#D4A373] uppercase font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
          2. CARVED WOOD CANVAS
        </span>
        <span className="text-[10px] font-mono text-[#A27B5C]">CARD 02/03</span>
      </div>

      <div className="relative z-10 font-serif text-[#F3E9DC] text-sm md:text-base leading-relaxed italic min-h-[65px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        "{currentTranscribedText}"
      </div>

      <div className="relative z-10 mt-2 pt-1.5 border-t border-[#8B5A2B]/40 flex items-center justify-between text-[10px] font-sans text-[#D4A373]">
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
      className={`absolute inset-x-0 top-0 p-5 bg-gradient-to-br from-[#E0F4F1] via-[#F4EFEA] to-[#D5E8E4] rounded-xl border-4 border-[#4EA896]/50 shadow-2xl transition-all duration-700 ease-out transform cursor-pointer select-none text-[#1C4E44] ${zIndex}`}
    >
      <div className="flex items-center justify-between mb-2 border-b border-[#A0D2C8] pb-1.5">
        <span className="text-[10px] font-mono tracking-widest text-[#2C7A6B] uppercase font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4EA896] animate-pulse"></span>
          3. SEA & BEACH WAVE CANVAS
        </span>
        <span className="text-[10px] font-mono text-[#2C7A6B]">CARD 03/03</span>
      </div>

      <div className="font-serif text-[#164038] text-sm md:text-base leading-relaxed italic min-h-[65px]">
        "{currentTranscribedText}"
      </div>

      <div className="mt-2 pt-1.5 border-t border-[#A0D2C8]/70 flex items-center justify-between text-[10px] font-sans text-[#2C7A6B]">
        <span>Theme: Coastal Goan Wave</span>
        <span className="font-mono text-[9px] bg-[#CBE6E1] px-2 py-0.5 rounded border border-[#4EA896]/30">TAP TO SLIDE →</span>
      </div>
    </div>
  );

  // Calculate stack positions and z-index offsets based on activeCardIndex
  const getCardProps = (cardIndex) => {
    const stackPos = (cardIndex - activeCardIndex + 3) % 3;

    if (stackPos === 0) {
      return {
        style: { transform: 'translate(0px, 0px) rotate(2deg) scale(1)', opacity: 1 },
        zIndex: 'z-30'
      };
    } else if (stackPos === 1) {
      return {
        style: { transform: 'translate(12px, 10px) rotate(-1.5deg) scale(0.97)', opacity: 0.92 },
        zIndex: 'z-20'
      };
    } else {
      return {
        style: { transform: 'translate(22px, 20px) rotate(3deg) scale(0.94)', opacity: 0.82 },
        zIndex: 'z-10'
      };
    }
  };

  return (
    <section id="vaani-intro" ref={container} className="relative w-full min-h-screen bg-[#FAF9F6] py-12 md:py-20 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-t-3xl flex items-center overflow-hidden">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 h-full px-4">
        
        {/* LEFT: Voice Shader Container (Clickable Box) */}
        <div className="intro-left relative w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="relative inline-block w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-square">
            
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
              MULTILINGUAL<br/>RAG AGENT
              <Tape className="top-[-8px] right-[-10px] w-8 h-4 rotate-[15deg]" />
            </div>

            {/* 3 Step Manual Controls */}
            <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <button 
                onClick={() => { setMode('idle'); setResponseState('idle'); setTranscript(''); setUserQuery(''); }} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'idle' ? 'bg-[#1A2E20] text-[#50ffeb] border-[#50ffeb]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                1. Idle
              </button>
              <button 
                onClick={() => { setMode('listening'); setResponseState('idle'); }} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'listening' ? 'bg-[#1A2E20] text-[#50ffeb] border-[#50ffeb]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                2. Mic ({selectedLang.toUpperCase()})
              </button>
              <button 
                onClick={transitionToSpeaking} 
                className={`px-3 py-1 text-[10px] font-mono rounded-full border transition-all ${mode === 'speaking' ? 'bg-[#FF9900]/20 text-[#FFD700] border-[#FFD700]' : 'bg-transparent text-[#8B663A] border-[#8B663A]/30'}`}
              >
                3. AI Response
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: Text & Transcribed Stacked Cards + AI Response Card Display */}
        <div className="intro-right w-full md:w-1/2 text-left flex flex-col justify-center">
          <div className="font-sans text-[#A88647] uppercase tracking-[0.2em] text-xs mb-2 font-semibold">
            THE PHILOSOPHY
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#232220] mb-2">
            Hi, I'm Vaani
          </h2>
          <p className="font-sans text-[#4A4A4A] text-xs md:text-sm leading-relaxed mb-4">
            Multilingual Voice RAG System. Speak in English or Hindi into your mic—speech transcribes live into the prompt card, and Vaani AI displays the retrieved answer below.
          </p>

          {/* Multilingual Selector Pills */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono text-[#8C6D53] uppercase font-bold">Mic Language:</span>
            <button
              onClick={() => { setSelectedLang('en'); if(mode==='speaking') setResponseState('ready'); }}
              className={`px-3 py-1 text-xs font-sans rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedLang === 'en'
                  ? 'bg-[#6C4E31] text-[#F5EFEB] border-[#6C4E31] shadow-md font-semibold'
                  : 'bg-[#E5DECC]/50 text-[#6C4E31] border-[#6C4E31]/30 hover:bg-[#E5DECC]'
              }`}
            >
              <span>🇬🇧</span> English (EN)
            </button>
            <button
              onClick={() => { setSelectedLang('hi'); if(mode==='speaking') setResponseState('ready'); }}
              className={`px-3 py-1 text-xs font-sans rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedLang === 'hi'
                  ? 'bg-[#6C4E31] text-[#F5EFEB] border-[#6C4E31] shadow-md font-semibold'
                  : 'bg-[#E5DECC]/50 text-[#6C4E31] border-[#6C4E31]/30 hover:bg-[#E5DECC]'
              }`}
            >
              <span>🇮🇳</span> हिन्दी (HI)
            </button>
          </div>

          {/* 1. INPUT QUERY STACKED CARDS (100% Real Live Speech Transcription) */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono font-bold text-[#6C4E31] uppercase tracking-wider">
                1. Voice Input (Real-Time Live Transcription)
              </span>
              <span className="text-[10px] font-mono text-[#8C6D53]">Tap card to cycle</span>
            </div>

            <div className="relative w-full max-w-md h-[165px]">
              {renderCard1(getCardProps(0).style, getCardProps(0).zIndex, handleCardClick)}
              {renderCard2(getCardProps(1).style, getCardProps(1).zIndex, handleCardClick)}
              {renderCard3(getCardProps(2).style, getCardProps(2).zIndex, handleCardClick)}
            </div>

            {/* Stack Indicator dots */}
            <div className="mt-2 flex gap-2 items-center">
              <button
                onClick={() => setActiveCardIndex(0)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeCardIndex === 0 ? 'w-10 bg-[#6C4E31]' : 'w-4 bg-[#DCD2BB]'
                }`}
                title="Card 1: Off-White Beige"
              />
              <button
                onClick={() => setActiveCardIndex(1)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeCardIndex === 1 ? 'w-10 bg-[#8B5A2B]' : 'w-4 bg-[#DCD2BB]'
                }`}
                title="Card 2: Carved Dark Wood"
              />
              <button
                onClick={() => setActiveCardIndex(2)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeCardIndex === 2 ? 'w-10 bg-[#4EA896]' : 'w-4 bg-[#DCD2BB]'
                }`}
                title="Card 3: Sea & Beach Wave"
              />
            </div>
          </div>

          {/* 2. RESPONSE CARD (Hardcoded Response Output) */}
          <div className="mt-5 w-full max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono font-bold text-[#1A2E20] uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  responseState === 'ready' ? 'bg-emerald-500 animate-pulse' :
                  responseState === 'processing' ? 'bg-amber-500 animate-ping' : 'bg-gray-400'
                }`}></span>
                2. Vaani AI Response (RAG Output)
              </span>
              {responseState === 'ready' && (
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                  {selectedLang === 'hi' ? 'हिन्दी RAG' : 'ENGLISH RAG'}
                </span>
              )}
            </div>

            <div className={`p-4 md:p-5 rounded-xl border-2 transition-all duration-500 shadow-xl relative overflow-hidden ${
              responseState === 'ready' 
                ? 'bg-[#1A2E20] border-[#8B663A] text-[#F3E9DC]' 
                : responseState === 'processing' 
                ? 'bg-[#F5F2EA] border-amber-400 text-[#3D2C1E]' 
                : 'bg-[#FAF7F2] border-[#DCD2BB] text-[#7E634E]'
            }`}>
              <Tape className="top-[-8px] right-6 z-10 opacity-70" />
              
              {responseState === 'idle' && (
                <p className="font-serif italic text-xs md:text-sm text-[#8C6D53]">
                  Awaiting voice query... Click the shader box to speak into your mic, and the hardcoded RAG response will appear here.
                </p>
              )}

              {responseState === 'processing' && (
                <div className="flex items-center gap-3 py-1">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-serif italic text-xs md:text-sm text-[#5C4033]">
                    Processing query & retrieving {currentQA.langName} RAG embeddings...
                  </p>
                </div>
              )}

              {responseState === 'ready' && (
                <div className="space-y-2">
                  {/* Language Switch Tabs inside Response Card */}
                  <div className="flex items-center justify-between border-b border-[#8B663A]/40 pb-1.5">
                    <div className="text-[10px] font-mono tracking-widest text-[#D4A373] uppercase font-bold flex items-center gap-1.5">
                      <span>{currentQA.flag}</span>
                      <span>RETRIEVED ANSWER ({currentQA.langName}):</span>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedLang('en')}
                        className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                          selectedLang === 'en' ? 'bg-[#8B663A] text-white' : 'bg-black/30 text-[#D4A373]'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setSelectedLang('hi')}
                        className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                          selectedLang === 'hi' ? 'bg-[#8B663A] text-white' : 'bg-black/30 text-[#D4A373]'
                        }`}
                      >
                        HI
                      </button>
                    </div>
                  </div>

                  <p className="font-serif text-sm md:text-base leading-relaxed text-[#F5EFEB]">
                    "{hardcodedResponses[selectedLang].answer}"
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
