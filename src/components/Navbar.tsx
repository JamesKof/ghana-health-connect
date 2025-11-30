import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Users, Gift, FileText, UserPlus, Phone, CreditCard, Hospital, Award, Shield, HelpCircle, Download, ChevronDown } from 'lucide-react';
import { NHISLogo } from './NHISLogo';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: Info },
  { name: 'Membership', href: '#membership-detail', icon: Users },
  { name: 'Benefits', href: '#benefits', icon: Gift },
  { name: 'Services', href: '#services', icon: FileText, hasDropdown: true, dropdownItems: [
    { name: 'Claims Payment', href: '#claims-payment', icon: CreditCard },
    { name: 'Providers', href: '#providers', icon: Hospital },
    { name: 'Credentialing', href: '#credentialing', icon: Award },
    { name: 'Private Insurance', href: '#private-health-insurance', icon: Shield },
  ]},
  { name: 'FAQs', href: '#faqs', icon: HelpCircle },
  { name: 'Downloads', href: '#downloads', icon: Download },
  { name: 'Contact', href: '#contact', icon: Phone },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-glass border border-white/50' 
            : 'bg-white/60 backdrop-blur-lg border border-white/30'
        } rounded-2xl`}
      >
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <NHISLogo className="h-10 md:h-12" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-card border border-border overflow-hidden"
                          >
                            {item.dropdownItems?.map((dropItem) => (
                              <a
                                key={dropItem.name}
                                href={dropItem.href}
                                className="flex items-center gap-2 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                              >
                                <dropItem.icon className="w-4 h-4" />
                                {dropItem.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#registration"
                className="btn-accent text-sm"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary/5 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-card-hover border border-white/50 overflow-hidden lg:hidden max-h-[70vh] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-6 space-y-1 mt-1">
                      {item.dropdownItems.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          <dropItem.icon className="w-4 h-4" />
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-border">
                <a
                  href="#registration"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-accent w-full text-center block"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
