import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-healthcare.jpg';

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Ghanaian family at healthcare facility" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nhis-blue-dark/95 via-primary/90 to-primary/70" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-nhis-yellow/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-nhis-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-nhis-yellow rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Ghana's National Health Insurance</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Quality Healthcare Made{' '}
              <span className="text-nhis-yellow">Accessible</span>{' '}
              to Every Ghanaian
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              The National Health Insurance Scheme (NHIS) is a social intervention program 
              introduced by government to provide financial access to quality health care 
              for all residents in Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#registration"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-accent inline-flex items-center justify-center gap-2 text-lg px-8"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 inline-flex items-center justify-center gap-2"
              >
                Learn More
              </motion.a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white">95%</p>
                <p className="text-white/70 text-sm">Disease Coverage</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white">16</p>
                <p className="text-white/70 text-sm">Regions Covered</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white">4000+</p>
                <p className="text-white/70 text-sm">Accredited Facilities</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-80">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-nhis-yellow rounded-2xl flex items-center justify-center shadow-glow-yellow">
                  <Shield className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-white font-display text-xl font-semibold mb-4">Your Health, Our Priority</h3>
                <p className="text-white/70 text-sm mb-6">Access quality healthcare services across Ghana with your NHIS membership.</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-nhis-blue border-2 border-white/30" />
                    <div className="w-8 h-8 rounded-full bg-nhis-green border-2 border-white/30" />
                    <div className="w-8 h-8 rounded-full bg-nhis-yellow border-2 border-white/30" />
                  </div>
                  <span className="text-white/80 text-sm">Millions of Ghanaians covered</span>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-20 top-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
              >
                <Users className="w-6 h-6 text-nhis-yellow mb-2" />
                <p className="text-white text-sm font-medium">Family Coverage</p>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-16 bottom-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4"
              >
                <Heart className="w-6 h-6 text-nhis-green mb-2" />
                <p className="text-white text-sm font-medium">Maternity Care</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 40% 98%)" />
        </svg>
      </div>
    </section>
  );
};
