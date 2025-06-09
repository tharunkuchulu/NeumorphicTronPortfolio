import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import SoftSkills from "@/components/SoftSkills";
import Contact from "@/components/Contact";
import FloatingParticles from "@/components/FloatingParticles";
import AdvancedBackground from "@/components/AdvancedBackground";
import Enhanced3DEffects from "@/components/Enhanced3DEffects";
import PWAPrompt from "@/components/PWAPrompt";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import FloatingActionButton from "@/components/FloatingActionButton";
import ScrollProgress from "@/components/ScrollProgress";
import { SkipNavigation, KeyboardNavigation, FocusIndicator, ReducedMotionProvider, LiveAnnouncer } from "@/components/AccessibilityEnhancements";

export default function Portfolio() {
  return (
    <ReducedMotionProvider>
      <AnalyticsProvider>
        <SkipNavigation />
        <KeyboardNavigation />
        <FocusIndicator />
        <LiveAnnouncer />
        
        <div id="main-content" className="min-h-screen bg-dark-bg dark:bg-dark-bg light:bg-dark-bg text-white dark:text-white light:text-foreground relative">
          <ScrollProgress />
          <AdvancedBackground intensity="medium" theme="circuit" />
          <Enhanced3DEffects enabled={true} intensity="medium" />
          <FloatingParticles count={6} maxParticles={10} enabled={true} />
          <PWAPrompt />
          <Navigation />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <SoftSkills />
          <Contact />
          
          {/* Floating Action Button */}
          <FloatingActionButton />
          
          {/* Footer */}
          <footer className="py-6 border-t border-gray-800/50 bg-dark-bg/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex space-x-4">
                  <a 
                    href="mailto:tharunvankayala@gmail.com" 
                    className="text-gray-400 hover:text-tron transition-colors duration-300 p-2"
                    aria-label="Email"
                  >
                    <i className="fas fa-envelope text-lg"></i>
                  </a>
                  <a 
                    href="https://github.com/tharunkuchulu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-tron transition-colors duration-300 p-2"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                  <a 
                    href="https://linkedin.com/in/tharun-vankayala" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-tron transition-colors duration-300 p-2"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                </div>
                <div className="text-gray-400 text-xs">
                  © 2024 All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AnalyticsProvider>
    </ReducedMotionProvider>
  );
}