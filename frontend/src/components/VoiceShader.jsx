import React from 'react';

export default function VoiceShader({ mode = 'listening' }) {
  
  const getModeClasses = () => {
    switch(mode) {
      case 'thinking':
        return {
          container: 'animate-[spin_3s_linear_infinite]',
          inner: 'animate-[spin_1s_linear_infinite_reverse] scale-90 border-dashed',
          glow: 'animate-pulse opacity-80',
          particles: 'opacity-100 animate-[spin_4s_linear_infinite]',
        };
      case 'speaking':
        return {
          container: 'animate-[bounce_0.5s_infinite] scale-110',
          inner: 'scale-100 border-solid border-[8px]',
          glow: 'animate-[pulse_0.2s_infinite] opacity-100 scale-125',
          particles: 'opacity-50 animate-[spin_8s_linear_infinite]',
        };
      case 'listening':
      default:
        return {
          container: 'animate-[pulse_4s_ease-in-out_infinite]',
          inner: 'scale-100 border-solid',
          glow: 'opacity-60 scale-100',
          particles: 'opacity-20 animate-[spin_12s_linear_infinite]',
        };
    }
  };

  const classes = getModeClasses();

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#1A2E20] overflow-hidden rounded-xl">
      
      {/* Outer ambient glow */}
      <div className={`absolute w-3/4 h-3/4 rounded-full bg-[#3be2d0] blur-3xl mix-blend-screen transition-all duration-700 ${classes.glow}`}></div>
      
      {/* Container for the ring */}
      <div className={`relative w-40 h-40 md:w-48 md:h-48 transition-all duration-500 flex items-center justify-center ${classes.container}`}>
        
        {/* The glowing ring itself */}
        <div className={`absolute inset-0 rounded-full border-4 border-[#50ffeb] shadow-[0_0_30px_#3be2d0,inset_0_0_20px_#3be2d0] transition-all duration-300 ${classes.inner}`}></div>
        
        {/* Core solid glow */}
        <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#1a9d8d] to-[#50ffeb] blur-lg opacity-80"></div>

      </div>

      {/* Floating particles/noise ring */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${classes.particles}`}>
         <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#50ffeb" strokeWidth="0.5" strokeDasharray="1 4 2 8 1 2" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3be2d0" strokeWidth="0.5" strokeDasharray="2 10 1 5" opacity="0.5" />
         </svg>
      </div>

    </div>
  );
}
