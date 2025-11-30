import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import nhisLogo from '@/assets/nhis-logo.png';

const quickLinks = [
  { name: 'About NHIS', href: '#about' },
  { name: 'Membership', href: '#membership' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Registration', href: '#registration' },
  { name: 'FAQs', href: 'https://www.nhis.gov.gh/faqs' },
];

const services = [
  { name: 'Claims Payment', href: 'https://www.nhis.gov.gh/payments' },
  { name: 'Credentialing', href: 'https://www.nhis.gov.gh/credentialing' },
  { name: 'Providers Portal', href: 'https://www.nhis.gov.gh/providers' },
  { name: 'Medicines List', href: 'https://www.nhis.gov.gh/medlist' },
  { name: 'Downloads', href: 'https://www.nhis.gov.gh/downloads' },
];

const externalLinks = [
  { name: 'Ministry of Health', href: 'https://www.moh.gov.gh' },
  { name: 'Ghana Health Service', href: 'https://www.ghs.gov.gh' },
  { name: 'MyNHIS App', href: '#' },
  { name: 'Government of Ghana', href: 'https://www.ghana.gov.gh' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/nhishg' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/NHIS_GHANA' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/nhis_ghana' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UC1LlFtmEswsRRCvQZ6DTbBA' },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-foreground to-nhis-blue-dark text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={nhisLogo} alt="NHIS Ghana" className="h-12 w-auto brightness-0 invert" />
              <div>
                <p className="font-display font-semibold text-white">NHIS Ghana</p>
                <p className="text-white/60 text-xs">National Health Insurance</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              The National Health Insurance Scheme provides financial access to quality healthcare 
              for all residents in Ghana.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@nhia.gov.gh" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                info@nhia.gov.gh
              </a>
              <a href="tel:+233302223399" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +233 (0)302 223 399
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Related Links</h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h4 className="font-display font-semibold text-white mt-8 mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} National Health Insurance Authority, Ghana. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://www.nhis.gov.gh/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="https://www.nhis.gov.gh/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
