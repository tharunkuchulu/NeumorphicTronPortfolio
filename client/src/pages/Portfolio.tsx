import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FloatingParticles from "@/components/FloatingParticles";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-dark-bg text-white relative">
      <FloatingParticles />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-orbitron text-xl font-bold text-tron mb-4 md:mb-0">
              Tharun Vankayala
            </div>
            <div className="flex space-x-6">
              <a 
                href="mailto:tharunvankayala@gmail.com" 
                className="text-gray-400 hover:text-tron transition-colors duration-300"
                aria-label="Email"
              >
                <i className="fas fa-envelope text-xl"></i>
              </a>
              <a 
                href="https://github.com/tharunkuchulu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tron transition-colors duration-300"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="https://linkedin.com/in/tharun-vankayala" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-tron transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              © 2024 Tharun Vankayala. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
