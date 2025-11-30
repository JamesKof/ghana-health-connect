import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Users, CreditCard, Hospital, HelpCircle, Download, Mail, Shield, Award } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  category: string;
}

const searchableContent: SearchResult[] = [
  { title: 'Home', description: 'NHIS homepage with overview of services', href: '/', icon: FileText, category: 'Pages' },
  { title: 'Membership Registration', description: 'How to register for NHIS membership', href: '/membership', icon: Users, category: 'Pages' },
  { title: 'Claims Payment', description: 'Information about claims processing and payment', href: '/claims-payment', icon: CreditCard, category: 'Services' },
  { title: 'Healthcare Providers', description: 'List of accredited healthcare facilities', href: '/providers', icon: Hospital, category: 'Services' },
  { title: 'Credentialing', description: 'Healthcare provider credentialing process', href: '/credentialing', icon: Award, category: 'Services' },
  { title: 'Private Insurance', description: 'Private health insurance schemes', href: '/private-insurance', icon: Shield, category: 'Services' },
  { title: 'FAQs', description: 'Frequently asked questions about NHIS', href: '/faqs', icon: HelpCircle, category: 'Help' },
  { title: 'Downloads', description: 'Forms, guidelines, and documents', href: '/downloads', icon: Download, category: 'Resources' },
  { title: 'Contact Us', description: 'Get in touch with NHIS', href: '/contact', icon: Mail, category: 'Help' },
  { title: 'Renew Membership', description: 'Dial *929# to renew your NHIS membership', href: '/membership', icon: Users, category: 'Quick Actions' },
  { title: 'Benefits Package', description: 'Services covered under NHIS', href: '/#benefits', icon: FileText, category: 'Information' },
  { title: 'Registration Requirements', description: 'Documents needed for NHIS registration', href: '/membership', icon: FileText, category: 'Information' },
  { title: 'Premium Payment', description: 'How to pay your NHIS premium', href: '/membership', icon: CreditCard, category: 'Information' },
  { title: 'Accredited Facilities', description: 'Find NHIS accredited hospitals near you', href: '/providers', icon: Hospital, category: 'Services' },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchableContent.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(searchableContent.slice(0, 6));
    }
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        <div className="flex items-center border-b border-border px-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search NHIS services, pages, information..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-base"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border bg-muted px-2 text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result, index) => (
                <motion.button
                  key={result.href + result.title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(result.href)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <result.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{result.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {result.category}
                  </span>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try searching for services, pages, or topics</p>
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground bg-muted/30">
          <span>Press <kbd className="px-1.5 py-0.5 bg-background border rounded">↵</kbd> to select</span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-background border rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-background border rounded ml-1">K</kbd> to search
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
