import React, { useState, useEffect } from 'react';

export default function MobileTopHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show plain text logo header fast as soon as user scrolls past top (50px)
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-5 left-5 z-50 md:hidden pointer-events-none transition-all duration-200 ease-out ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="font-serif text-xl sm:text-2xl tracking-widest text-[#E8D5B5] font-bold drop-shadow-md pointer-events-auto select-none">
        VAANI AI
      </div>
    </div>
  );
}
