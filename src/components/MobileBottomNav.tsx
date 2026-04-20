import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, UserCircle, Mail, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Facilities', href: '/facilities', icon: MapPin },
  { name: 'Portal', href: '/member-portal', icon: UserCircle },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-1 py-1.5 sm:px-2 sm:py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all min-w-[56px] sm:min-w-[64px] min-h-[44px] touch-manipulation",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground active:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all",
                active && "bg-primary/10"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-transform",
                  active && "scale-110"
                )} />
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                active && "text-primary"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};
