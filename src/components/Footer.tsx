import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { NHISLogoWhite } from './NHISLogo';

const quickLinks = [
  { name: 'About NHIS', href: '/#about' },
  { name: 'Membership', href: '/membership' },
  { name: 'Benefits', href: '/#benefits' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact Us', href: '/contact' },
];

const services = [
  { name: 'Claims Payment', href: '/claims-payment' },
  { name: 'Credentialing', href: '/credentialing' },
  { name: 'Providers', href: '/providers' },
  { name: 'Private Insurance', href: '/private-insurance' },
  { name: 'Downloads', href: '/downloads' },
];

const externalLinks = [
  { name: 'Ministry of Health', href: 'https://www.moh.gov.gh' },
  { name: 'Ghana Health Service', href: 'https://www.ghs.gov.gh' },
  { name: 'MyNHIS App', href: 'https://play.google.com/store/apps/details?id=com.lolosoft.android.mynthis' },
  { name: 'Government of Ghana', href: 'https://www.ghana.gov.gh' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/nhishg' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/NHIS_GHANA' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/nhisghana_gov' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UC1LlFtmEswsRRCvQZ6DTbBA' },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-foreground to-nhis-blue-dark text-white">
      {/* USSD Banner */}
      <div className="bg-gradient-to-r from-nhis-yellow to-nhis-yellow-light py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-foreground">
            <span className="font-semibold">Renew your NHIS membership instantly!</span>
            <a 
              href="tel:*929%23" 
              className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-white rounded-full font-bold hover:bg-foreground/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Dial *929#
            </a>
            <span className="text-sm opacity-80">Works on all networks</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom section-padding pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <NHISLogoWhite className="h-14 w-auto" />
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
              <a href="tel:+233544446447" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                054 444 6447 (Call Center)
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>No. 36-6th Avenue, Ridge, Accra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                  </Link>
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
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.name}
                  </Link>
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
