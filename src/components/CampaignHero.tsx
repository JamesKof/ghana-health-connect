import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Users, ArrowRight, Sparkles } from 'lucide-react';

export const CampaignHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nhis-blue-dark via-primary to-secondary" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nhis-yellow/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-nhis-yellow" />
            <span className="text-white/90 text-sm font-semibold">National Campaign</span>
          </motion.div>

          {/* Main Content */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-nhis-yellow">Insure All Ghana</span>
            <br />
            Initiative
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
            NHIS Renewal Week 2024
          </p>
          
          <p className="text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join millions of Ghanaians in securing their health future. Renew your NHIS membership today 
            and enjoy uninterrupted access to quality healthcare services across the nation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { value: '16', label: 'Regions' },
              { value: '260+', label: 'Districts' },
              { value: '4000+', label: 'Facilities' },
              { value: '95%', label: 'Coverage' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
              >
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#registration"
              className="btn-accent inline-flex items-center justify-center gap-2 text-lg px-8"
            >
              <Calendar className="w-5 h-5" />
              Renew Now
            </a>
            <a
              href="#contact"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Find Event Near You
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H0Z" fill="hsl(210 40% 98%)" />
        </svg>
      </div>
    </section>
  );
};
