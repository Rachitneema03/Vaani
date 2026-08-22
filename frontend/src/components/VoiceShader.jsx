import React from 'react';

export default function VoiceShader({ mode = 'idle' }) {
  const getModeStyles = () => {
    switch (mode) {
      case 'listening': // State 2: Active Listening to user mic
        return {
          ringColor: 'border-[#50ffeb]',
          glowBg: 'bg-[#3be2d0]',
          shadow: 'shadow-[0_0_45px_#3be2d0,inset_0_0_30px_#50ffeb]',
          containerAnim: 'scale-105 animate-[pulse_1.2s_ease-in-out_infinite]',
          ringAnim: 'border-solid border-[5px]',
          glowAnim: 'opacity-90 scale-110 blur-2xl animate-pulse',
          particleAnim: 'opacity-80 animate-[spin_4s_linear_infinite]',
          label: 'LISTENING...',
          colorHex: '#50ffeb'
        };
      case 'speaking': // State 3: Thinking / Processing / Responding
        return {
          ringColor: 'border-[#FFD700]',
          glowBg: 'bg-[#FF9900]',
          shadow: 'shadow-[0_0_50px_#FF9900,inset_0_0_35px_#FFD700]',
          containerAnim: 'scale-110 animate-[bounce_1.5s_infinite]',
          ringAnim: 'border-dashed border-[6px] animate-[spin_6s_linear_infinite]',
          glowAnim: 'opacity-100 scale-125 blur-3xl animate-pulse',
          particleAnim: 'opacity-90 animate-[spin_3s_linear_infinite]',
          label: 'RESPONDING...',
          colorHex: '#FFD700'
        };
      case 'idle': // State 1: Ready to tap
      default:
        return {
          ringColor: 'border-[#3be2d0]/60',
          glowBg: 'bg-[#1a9d8d]',
          shadow: 'shadow-[0_0_20px_#3be2d0,inset_0_0_10px_#1a9d8d]',
          containerAnim: 'scale-100 hover:scale-105 transition-transform duration-300',
          ringAnim: 'border-solid border-2',
          glowAnim: 'opacity-40 scale-90 blur-xl',
          particleAnim: 'opacity-30 animate-[spin_20s_linear_infinite]',
          label: 'TAP TO SPEAK',
          colorHex: '#3be2d0'
        };
    }
  };

  const style = getModeStyles();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#1A2E20] overflow-hidden rounded-2xl select-none">
      {/* Outer ambient glow */}
      <div className={`absolute w-3/4 h-3/4 rounded-full mix-blend-screen transition-all duration-700 ${style.glowBg} ${style.glowAnim}`}></div>

      {/* Main interactive ring container */}
      <div className={`relative w-36 h-36 md:w-48 md:h-48 transition-all duration-700 ease-out flex items-center justify-center cursor-pointer ${style.containerAnim}`}>
        {/* Glowing ring */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${style.ringColor} ${style.shadow} ${style.ringAnim}`}></div>

        {/* Core solid glow */}
        <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#1a9d8d] to-[#50ffeb] blur-md opacity-80 transition-all duration-500"></div>

        {/* Center Mic / Pulse Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white pointer-events-none">
          {mode === 'idle' && (
            <svg className="w-10 h-10 text-white/90 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}

          {mode === 'listening' && (
            <div className="flex items-center gap-1.5 h-10">
              <span className="w-1.5 h-6 bg-[#50ffeb] rounded-full animate-[pulse_0.4s_ease-in-out_infinite_alternate]"></span>
              <span className="w-1.5 h-10 bg-[#50ffeb] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_alternate_100ms]"></span>
              <span className="w-1.5 h-8 bg-[#50ffeb] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_alternate_200ms]"></span>
              <span className="w-1.5 h-5 bg-[#50ffeb] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_alternate_150ms]"></span>
            </div>
          )}

          {mode === 'speaking' && (
            <svg className="w-10 h-10 text-[#FFD700] drop-shadow-md animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </div>
      </div>

      {/* Floating particles/ring ornament */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${style.particleAnim}`}>
        <svg className="w-full h-full opacity-40" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke={style.colorHex} strokeWidth="0.5" strokeDasharray="2 6 1 4" />
          <circle cx="50" cy="50" r="46" fill="none" stroke={style.colorHex} strokeWidth="0.5" strokeDasharray="3 10" opacity="0.6" />
        </svg>
      </div>

      {/* Status Label */}
      <div className="absolute bottom-4 text-center z-10 pointer-events-none">
        <span
          className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 shadow-sm transition-colors duration-500"
        >
          {style.label}
        </span>
      </div>
    </div>
  );
}
