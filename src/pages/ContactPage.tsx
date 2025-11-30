import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Center',
    details: ['054 444 6447', '+233 (0)302 238136'],
    action: 'tel:+233544446447',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@nhia.gov.gh'],
    action: 'mailto:info@nhia.gov.gh',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['No. 36-6th Avenue', 'Ridge Residential Area, Accra'],
    action: 'https://maps.google.com/?q=Ridge+Accra+Ghana',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday - Friday', '8:00 AM - 5:00 PM'],
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later or call our hotline.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary via-nhis-blue-dark to-nhis-green relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Contact Us</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                Contact Us
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Get in touch with NHIS Ghana. We're here to help.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about NHIS membership, benefits, or claims? Our team is ready to assist you.
                </p>
              </motion.div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-card transition-all"
                >
                  {info.action ? (
                    <a
                      href={info.action}
                      target={info.action.startsWith('http') ? '_blank' : undefined}
                      rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                        ))}
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* USSD Banner */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-nhis-yellow to-nhis-yellow-light rounded-xl p-6 text-center"
              >
                <p className="font-semibold text-foreground mb-2">Quick Renewal via USSD</p>
                <a href="tel:*929%23" className="text-3xl font-mono font-bold text-foreground hover:opacity-80 transition-opacity">
                  *929#
                </a>
                <p className="text-sm text-foreground/70 mt-2">Works on all networks</p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-destructive' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                        placeholder="+233 XX XXX XXXX"
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-destructive' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                      >
                        <option value="">Select a subject</option>
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Benefits Information">Benefits Information</option>
                        <option value="Claims Assistance">Claims Assistance</option>
                        <option value="Renewal Help">Renewal Help</option>
                        <option value="Provider Registration">Provider Registration</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-destructive' : 'border-border'} bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl overflow-hidden border border-border shadow-card"
          >
            <div className="aspect-video md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7268698826195!2d-0.19045368523671287!3d5.566896395966936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0x5e24c716a2f7e65f!2sRidge%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NHIS Ghana Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
