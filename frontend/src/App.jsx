import React from 'react';
import Hero from './components/Hero';
import GlassNavbar from './components/GlassNavbar';
import MobileTopHeader from './components/MobileTopHeader';
import VaaniIntro from './components/VaaniIntro';
import HowVaaniThinks from './components/HowVaaniThinks';
import Telemetry from './components/Telemetry';
import ModelInfo from './components/ModelInfo';
import TeamProcess from './components/TeamProcess';
import Footer from './components/Footer';
import { ExpandableTabs } from '@/components/ui/expandable-tabs';
import './index.css';

function App() {
  // Mobile expandable bottom navigation tabs with Bootstrap Icons
  const mobileTabs = [
    { title: "Home", icon: "bi bi-house-door-fill", href: "#" },
    { title: "Vaani AI", icon: "bi bi-mic-fill", href: "#vaani-intro" },
    { type: "separator" },
    { title: "Stats", icon: "bi bi-[#3be2d0] bi-activity", href: "#telemetry-stats" },
    { title: "Team", icon: "bi bi-people-fill", href: "#team-process" },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#1A2E20] font-sans selection:bg-[#A88647] selection:text-white pb-20 md:pb-0">
      
      {/* Mobile-only persistent top-left logo header for all lower sections */}
      <MobileTopHeader />

      {/* Glassmorphic Navbar for non-hero sections (Desktop Only) */}
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

      {/* Floating Full-Width Apple Glassmorphism Mobile Bottom Navigation Menu */}
      <div className="fixed bottom-6 inset-x-4 max-w-md mx-auto z-50 md:hidden pointer-events-auto">
        <ExpandableTabs 
          tabs={mobileTabs} 
          activeColor="text-[#50ffeb]"
          className="w-full bg-white/10 dark:bg-black/30 backdrop-blur-2xl border border-white/30 shadow-[0_12px_35px_rgba(0,0,0,0.5)]"
        />
      </div>

    </div>
  );
}

export default App;
