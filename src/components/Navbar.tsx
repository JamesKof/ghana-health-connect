import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Users, FileText, CreditCard, Hospital, Award, Shield, HelpCircle, Download, ChevronDown, Mail, Search, UserCircle, MapPin, Phone, X } from 'lucide-react';
import { NHISLogo } from './NHISLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { SearchDialog } from './SearchDialog';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Membership', href: '/membership', icon: Users },
  { name: 'Services', href: '#', icon: FileText, hasDropdown: true, dropdownItems: [
    { name: 'Claims Payment', href: '/claims-payment', icon: CreditCard },
    { name: 'Providers', href: '/providers', icon: Hospital },
    { name: 'Credentialing', href: '/credentialing', icon: Award },
    { name: 'Private Insurance', href: '/private-insurance', icon: Shield },
  ]},
  { name: 'Facilities', href: '/facilities', icon: MapPin },
  { name: 'FAQs', href: '/faqs', icon: HelpCircle },
  { name: 'Downloads', href: '/downloads', icon: Download },
  { name: 'Contact', href: '/contact', icon: Mail },
];

const quickActions = [
  { name: 'Member Portal', href: '/member-portal', icon: UserCircle, variant: 'secondary' as const },
  { name: 'USSD: *929#', href: 'tel:*929#', icon: Phone, variant: 'outline' as const },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
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
              <NHISLogo className="h-10 md:h-12" showText={true} />
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

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
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

            {/* Mobile/Tablet Menu */}
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
              
              {/* Hamburger Menu Sheet */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 overflow-y-auto">
                  <SheetHeader className="p-4 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2">
                        <NHISLogo className="h-8" showText={false} />
                        <span className="font-display font-bold text-primary">NHIS</span>
                      </SheetTitle>
                    </div>
                  </SheetHeader>
                  
                  <div className="p-4 space-y-1">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Link
                        to="/membership"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/member-portal"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm"
                      >
                        <UserCircle className="w-4 h-4" />
                        Portal
                      </Link>
                    </div>

                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-2">
                      Menu
                    </div>

                    {/* Navigation Items */}
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.hasDropdown ? (
                          <Collapsible
                            open={expandedItem === item.name}
                            onOpenChange={(open) => setExpandedItem(open ? item.name : null)}
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-foreground/80 hover:bg-primary/5 transition-all">
                              <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <ChevronDown className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                expandedItem === item.name && "rotate-180"
                              )} />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="ml-4 pl-4 border-l-2 border-border/50 space-y-1 py-1">
                                {item.dropdownItems?.map((dropItem) => (
                                  <Link
                                    key={dropItem.name}
                                    to={dropItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all",
                                      isActive(dropItem.href) 
                                        ? "text-primary bg-primary/10 font-medium" 
                                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                    )}
                                  >
                                    <dropItem.icon className="w-4 h-4" />
                                    {dropItem.name}
                                  </Link>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                              isActive(item.href) 
                                ? "text-primary bg-primary/10 font-medium" 
                                : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}

                    {/* Quick Access Section */}
                    <div className="pt-4 mt-4 border-t border-border/50">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-2">
                        Quick Access
                      </div>
                      
                      {/* USSD Card */}
                      <div className="bg-gradient-to-br from-nhis-green/10 to-nhis-green/5 rounded-xl p-4 mt-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-nhis-green/20 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-nhis-green" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">USSD Service</p>
                            <p className="text-lg font-bold text-nhis-green">*929#</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Register, renew, or check your NHIS status
                        </p>
                      </div>

                      {/* Contact Info */}
                      <div className="mt-3 space-y-2">
                        <a 
                          href="tel:+233302223333" 
                          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          +233 30 222 3333
                        </a>
                        <a 
                          href="mailto:info@nhia.gov.gh" 
                          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          info@nhia.gov.gh
                        </a>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
