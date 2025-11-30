import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const routeNames: Record<string, string> = {
  '': 'Home',
  'membership': 'Membership',
  'claims-payment': 'Claims Payment',
  'providers': 'Providers',
  'credentialing': 'Credentialing',
  'private-insurance': 'Private Insurance',
  'facilities': 'Facilities',
  'faqs': 'FAQs',
  'downloads': 'Downloads',
  'contact': 'Contact',
  'member-portal': 'Member Portal',
  'about': 'About NHIS',
  'nhia': 'The Authority',
  'management': 'Management',
  'board': 'Governing Board',
  'medlist': 'Medicines List',
};

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumb on home page
  if (pathnames.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-white/50" />
            {isLast ? (
              <span className="text-white font-medium">{name}</span>
            ) : (
              <Link
                to={to}
                className="text-white/70 hover:text-white transition-colors"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
};
