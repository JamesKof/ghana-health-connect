import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, FileText, CreditCard, Hospital, Award, Shield, HelpCircle, Download, ChevronDown, Mail, Search, UserCircle } from 'lucide-react';
import { NHISLogo } from './NHISLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { SearchDialog } from './SearchDialog';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Membership', href: '/membership', icon: Users },
  { name: 'Services', href: '#', icon: FileText, hasDropdown: true, dropdownItems: [
    { name: 'Claims Payment', href: '/claims-payment', icon: CreditCard },
    { name: 'Providers', href: '/providers', icon: Hospital },
    { name: 'Credentialing', href: '/credentialing', icon: Award },
    { name: 'Private Insurance', href: '/private-insurance', icon: Shield },
  ]},
  { name: 'FAQs', href: '/faqs', icon: HelpCircle },
  { name: 'Downloads', href: '/downloads', icon: Download },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl shadow-glass border border-border/50' 
            : 'bg-background/60 backdrop-blur-lg border border-border/30'
        } rounded-2xl`}
      >
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <NHISLogo className="h-10 md:h-12" showText={false} />
            </Link>

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
                        <ChevronDown className={cn("w-3 h-3 transition-transform", openDropdown === item.name && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-1 w-52 bg-card/95 backdrop-blur-xl rounded-xl shadow-card border border-border overflow-hidden"
                          >
                            {item.dropdownItems?.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                to={dropItem.href}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-3 text-sm transition-all",
                                  isActive(dropItem.href) 
                                    ? "text-primary bg-primary/10" 
                                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                                )}
                              >
                                <dropItem.icon className="w-4 h-4" />
                                {dropItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                        isActive(item.href) 
                          ? "text-primary bg-primary/10" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-primary/5 transition-colors text-foreground/80 hover:text-primary"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <LanguageToggle />
              <ThemeToggle />
              <Link
                to="/member-portal"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
              >
                <UserCircle className="w-4 h-4" />
                <span>Portal</span>
              </Link>
              <Link
                to="/membership"
                className="btn-accent text-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
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
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md bg-card/95 backdrop-blur-xl rounded-2xl shadow-card-hover border border-border/50 overflow-hidden lg:hidden max-h-[70vh] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 font-medium text-sm">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems?.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.href}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all",
                              isActive(dropItem.href) 
                                ? "text-primary bg-primary/10" 
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <dropItem.icon className="w-4 h-4" />
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                          isActive(item.href) 
                            ? "text-primary bg-primary/10" 
                            : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Link
                  to="/member-portal"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
                >
                  <UserCircle className="w-5 h-5" />
                  Member Portal
                </Link>
                <Link
                  to="/membership"
                  className="btn-accent w-full text-center block"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
