import React, { useState, useEffect } from 'react';

export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger glass navbar transition when scrolled down to second section
      const secondSection = document.getElementById('vaani-intro');
      if (secondSection) {
        const rect = secondSection.getBoundingClientRect();
        // Switch to glass navbar when second section reaches near top of viewport (e.g. top <= 100px)
        setScrolled(rect.top <= 120);
      } else {
        setScrolled(window.scrollY >= window.innerHeight * 0.85);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-700 ease-in-out">
      <div className="w-full flex justify-center p-4 md:p-6 transition-all duration-700 ease-in-out">
        <nav
          className={`pointer-events-auto transition-all duration-700 ease-in-out flex items-center justify-between font-sans uppercase tracking-[0.2em] font-medium ${
            scrolled
              ? 'w-[90%] max-w-5xl px-8 py-4 rounded-full bg-gray-900/65 backdrop-blur-lg border border-gray-500/30 shadow-2xl shadow-black/40 text-gray-200 text-xs translate-y-2'
              : 'w-full px-6 md:px-10 py-4 bg-transparent border-transparent text-white text-xs mix-blend-difference'
          }`}
        >
          {/* Left Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#vaani-intro"
              className={`group flex items-center gap-2 transition-colors ${
                scrolled ? 'text-gray-300 hover:text-white' : 'hover:opacity-80'
              }`}
            >
              Go to Agent <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#telemetry-stats"
              className={`hidden md:block transition-colors ${
                scrolled ? 'text-gray-300 hover:text-white' : 'hover:opacity-80'
              }`}
            >
              Latency Info
            </a>
            <a
              href="#team-process"
              className={`hidden md:block transition-colors ${
                scrolled ? 'text-gray-300 hover:text-white' : 'hover:opacity-80'
              }`}
            >
              The Team
            </a>
            <a
              href="#telemetry-stats"
              className={`hidden lg:block transition-colors ${
                scrolled ? 'text-gray-300 hover:text-white' : 'hover:opacity-80'
              }`}
            >
              Hackerhouse Goa
            </a>
          </div>

          {/* Right Brand / Logo */}
          <div
            className={`font-serif tracking-widest font-semibold transition-all duration-500 ${
              scrolled ? 'text-lg md:text-xl text-amber-100/90' : 'text-2xl text-white'
            }`}
          >
            VAANI AI
          </div>
        </nav>
      </div>
    </header>
  );
}
