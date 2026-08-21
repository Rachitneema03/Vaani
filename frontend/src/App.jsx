import React from 'react';
import Hero from './components/Hero';
import GlassNavbar from './components/GlassNavbar';
import VaaniIntro from './components/VaaniIntro';
import HowVaaniThinks from './components/HowVaaniThinks';
import Telemetry from './components/Telemetry';
import ModelInfo from './components/ModelInfo';
import TeamProcess from './components/TeamProcess';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#1A2E20] font-sans selection:bg-[#A88647] selection:text-white">
      
      {/* Glassmorphic Navbar for non-hero sections */}
      <GlassNavbar />

      {/* 1. Full-screen lock-screen hero */}
      <Hero />

      {/* 2. Intro Section (Slides up over hero on scroll) */}
      <VaaniIntro />

      {/* 3. Technical Section: Container for Pipeline, Telemetry, Model Info */}
      <section id="telemetry-stats" className="w-full bg-[#1A2E20] py-16 relative z-10">
        <div className="container max-w-[1400px] mx-auto px-4 md:px-8">
          
          {/* Inner Cream Container framing the technical bits */}
          <div className="grid grid-cols-12 bg-[#F5F2EA] rounded-xl overflow-hidden shadow-2xl shadow-black/20 border-4 border-[#1A2E20]/50 outline outline-1 outline-[#DCD2BB] relative">
            
            {/* Pipeline (7 cols) */}
            <HowVaaniThinks />
            
            {/* Telemetry (3 cols) */}
            <Telemetry />
            
            {/* Model Info (2 cols) */}
            <ModelInfo />
            
          </div>
          
        </div>
      </section>

      {/* 4. Team & Process */}
      <TeamProcess />

      {/* 5. Footer */}
      <Footer />

    </div>
  );
}

export default App;
