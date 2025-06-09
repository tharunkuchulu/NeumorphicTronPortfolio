import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-card/95 border-b border-tron/20' 
          : 'bg-dark-card/80 border-b border-gray-800/30'
      }`}
      style={{ position: 'fixed', top: 0 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a 
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-orbitron text-xl font-bold text-tron cursor-pointer hover:text-white transition-all duration-300 hover:scale-105"
          >
            Tharun Vankayala
          </a>
          
          <div className="hidden md:flex space-x-8">
            {['#about', '#projects', '#skills', '#experience', '#certifications', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="relative py-2 px-4 hover:text-tron transition-all duration-300 capitalize group"
              >
                <span className="relative z-10">{href.slice(1)}</span>
                <div className="absolute bottom-0 left-0 h-0.5 bg-tron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 w-full"></div>
              </a>
            ))}
          </div>
          
          <button 
            className="md:hidden text-tron"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fadeIn">
            {['#about', '#projects', '#skills', '#experience', '#certifications', '#contact'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block hover:text-tron transition-colors duration-300 capitalize py-3 px-4 rounded-lg hover:bg-tron/10"
              >
                {href.slice(1)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}