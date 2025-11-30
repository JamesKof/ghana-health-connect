import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  label: string;
  icon?: string;
}

interface SectionNavProps {
  sections: Section[];
}

export const SectionNav = ({ sections }: SectionNavProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (approximately 500px)
      setIsVisible(window.scrollY > 500);

      // Find the current active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100; // Account for fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
        >
          <div className="relative">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 -m-2 rounded-2xl bg-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg" />
            
            <div className="relative p-2 space-y-1">
              {/* Active indicator line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nhis-blue via-nhis-green to-nhis-yellow rounded-full opacity-20" />
              
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 w-full text-left",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Active dot indicator */}
                    <motion.div
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        isActive 
                          ? "bg-nhis-green shadow-[0_0_8px_rgba(0,166,81,0.5)]" 
                          : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                      )}
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                    />
                    
                    {/* Label */}
                    <span className="text-xs font-medium whitespace-nowrap">
                      {section.label}
                    </span>

                    {/* Active glow effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-xl bg-nhis-green/5 -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Progress indicator */}
            <div className="absolute -right-1 top-2 bottom-2 w-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-nhis-blue via-nhis-green to-nhis-yellow rounded-full"
                style={{
                  height: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
