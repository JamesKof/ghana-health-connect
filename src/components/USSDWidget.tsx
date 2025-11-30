import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Star, RefreshCw, UserPlus, CreditCard, HelpCircle } from 'lucide-react';

const ussdOptions = [
  { code: '1', label: 'New Registration', icon: UserPlus },
  { code: '2', label: 'Renew Membership', icon: RefreshCw },
  { code: '3', label: 'Check Status', icon: HelpCircle },
  { code: '4', label: 'Make Payment', icon: CreditCard },
];

export const USSDWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating USSD Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-nhis-yellow to-nhis-yellow-light text-foreground font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="w-5 h-5" />
        <span className="font-mono">*929#</span>
      </motion.button>

      {/* USSD Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
            >
              <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-nhis-blue-dark p-6 text-white relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-nhis-yellow flex items-center justify-center">
                      <Star className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold">NHIS USSD Service</h3>
                      <p className="text-white/80 text-sm">Quick access on any phone</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* USSD Code Display */}
                  <div className="bg-gradient-to-r from-nhis-yellow/20 to-nhis-green/20 rounded-xl p-4 mb-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Dial this code on your phone</p>
                    <a 
                      href="tel:*929%23"
                      className="text-4xl font-mono font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      *929#
                    </a>
                    <p className="text-xs text-muted-foreground mt-2">Works on all networks in Ghana</p>
                  </div>

                  {/* Options */}
                  <h4 className="font-semibold text-foreground mb-3">Available Services:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {ussdOptions.map((option) => (
                      <div
                        key={option.code}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <option.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-mono text-xs text-muted-foreground">Press {option.code}</span>
                          <p className="text-sm font-medium text-foreground">{option.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  <div className="mt-6 p-3 rounded-xl bg-nhis-green/10 border border-nhis-green/20">
                    <p className="text-sm text-foreground">
                      <strong>Note:</strong> Fee-paying members can register and renew via USSD. 
                      Pregnant women and indigents should visit a District office.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
