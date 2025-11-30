import { useState, useRef } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { useDemoAuth } from '@/contexts/DemoAuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  CreditCard, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle,
  LogOut,
  Mail,
  Lock,
  AlertCircle,
  Download,
  Printer,
  KeyRound,
  MailCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MembershipCard } from '@/components/MembershipCard';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const MemberPortalPage = () => {
  const { user, isAuthenticated, login, logout, claims, payments } = useDemoAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'reset' | 'verify'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to your NHIS Member Portal.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Reset Link Sent",
      description: `A password reset link has been sent to ${resetEmail}`,
    });
    setAuthView('login');
    setResetEmail('');
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    if (verificationCode === '123456') {
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });
      setAuthView('login');
    } else {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code. Try: 123456",
        variant: "destructive",
      });
    }
    setVerificationCode('');
  };

  const handleDownloadCard = () => {
    if (!cardRef.current) return;
    
    // Create a printable window with just the card
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Download Failed",
        description: "Please allow popups to download the card.",
        variant: "destructive",
      });
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>NHIS Membership Card - ${user?.memberId}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px;
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
              background: #f5f5f5;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .card {
              width: 400px;
              height: 250px;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.2);
              position: relative;
              background: linear-gradient(135deg, #0066B3 0%, #004080 50%, #002855 100%);
            }
            .card-content {
              padding: 24px;
              height: 100%;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              color: white;
            }
            .header { display: flex; justify-content: space-between; align-items: flex-start; }
            .logo-area { display: flex; align-items: center; gap: 12px; }
            .logo { width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
            .logo-text { font-weight: bold; color: #0066B3; font-size: 14px; }
            .org-name h3 { margin: 0; font-size: 16px; }
            .org-name p { margin: 4px 0 0; opacity: 0.8; font-size: 13px; }
            .status { background: #00A651; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
            .member-info { margin-top: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; margin-bottom: 4px; }
            .name { font-size: 20px; font-weight: bold; margin: 0; }
            .member-id { font-family: monospace; font-size: 14px; font-weight: bold; letter-spacing: 1px; }
            .dates { display: flex; gap: 40px; margin-top: 12px; }
            .date-item p { margin: 0; }
            .footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2); }
            .footer-text { font-size: 11px; opacity: 0.6; }
            .flags { display: flex; gap: 8px; }
            .flag { width: 32px; height: 20px; border-radius: 4px; }
            .flag-yellow { background: #F7B32B; }
            .flag-green { background: #00A651; }
            .ghana-stripe { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; display: flex; }
            .ghana-stripe div { flex: 1; }
            .stripe-red { background: #CE1126; }
            .stripe-yellow { background: #FCD116; }
            .stripe-green { background: #006B3F; }
            @media print { 
              body { background: white; padding: 0; }
              .card { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="card-content">
              <div class="header">
                <div class="logo-area">
                  <div class="logo"><span class="logo-text">NHIS</span></div>
                  <div class="org-name">
                    <h3>National Health</h3>
                    <p>Insurance Scheme</p>
                  </div>
                </div>
                <div class="status">✓ ACTIVE</div>
              </div>
              <div class="member-info">
                <p class="label">Member Name</p>
                <p class="name">${user?.name}</p>
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 12px;">
                  <div>
                    <p class="label">Member ID</p>
                    <p class="member-id">${user?.memberId}</p>
                  </div>
                  <div style="text-align: right;">
                    <p class="label">Valid Until</p>
                    <p style="font-weight: bold; margin: 0;">${user?.expiryDate}</p>
                  </div>
                </div>
              </div>
              <div class="footer">
                <span class="footer-text">Registered: ${user?.registrationDate}</span>
                <div class="flags">
                  <div class="flag flag-yellow"></div>
                  <div class="flag flag-green"></div>
                </div>
              </div>
            </div>
            <div class="ghana-stripe">
              <div class="stripe-red"></div>
              <div class="stripe-yellow"></div>
              <div class="stripe-green"></div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    
    toast({
      title: "Print Dialog Opened",
      description: "Save as PDF or print your membership card.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return (
          <Badge className="bg-nhis-green/10 text-nhis-green border-nhis-green/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-nhis-yellow/10 text-nhis-yellow border-nhis-yellow/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'expired':
      case 'rejected':
      case 'failed':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <section className="pt-32 pb-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-border/50 shadow-card">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    {authView === 'login' && <User className="w-8 h-8 text-primary" />}
                    {authView === 'reset' && <KeyRound className="w-8 h-8 text-primary" />}
                    {authView === 'verify' && <MailCheck className="w-8 h-8 text-primary" />}
                  </div>
                  <CardTitle className="text-2xl">
                    {authView === 'login' && t('portal.title')}
                    {authView === 'reset' && 'Reset Password'}
                    {authView === 'verify' && 'Verify Email'}
                  </CardTitle>
                  <CardDescription>
                    {authView === 'login' && 'Login to view your membership status, claims history, and payment records.'}
                    {authView === 'reset' && 'Enter your email to receive a password reset link.'}
                    {authView === 'verify' && 'Enter the verification code sent to your email.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {authView === 'login' && (
                    <>
                      <div className="bg-nhis-yellow/10 border border-nhis-yellow/20 rounded-lg p-3 mb-6 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-nhis-yellow shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          {t('portal.demoNote')}
                        </p>
                      </div>
                      
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? t('common.loading') : t('portal.login')}
                        </Button>
                      </form>
                      
                      <div className="mt-6 pt-6 border-t border-border space-y-3">
                        <button 
                          onClick={() => setAuthView('reset')}
                          className="w-full text-sm text-primary hover:underline flex items-center justify-center gap-2"
                        >
                          <KeyRound className="w-4 h-4" />
                          Forgot Password?
                        </button>
                        <button 
                          onClick={() => setAuthView('verify')}
                          className="w-full text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-2"
                        >
                          <MailCheck className="w-4 h-4" />
                          Verify Email Address
                        </button>
                      </div>
                    </>
                  )}
                  
                  {authView === 'reset' && (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                      <button 
                        type="button"
                        onClick={() => setAuthView('login')}
                        className="w-full text-sm text-muted-foreground hover:text-primary"
                      >
                        Back to Login
                      </button>
                    </form>
                  )}
                  
                  {authView === 'verify' && (
                    <form onSubmit={handleVerifyEmail} className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-muted-foreground">
                          Demo: Use code <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">123456</code>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Verification Code</label>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="text-center text-lg tracking-widest"
                          maxLength={6}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                      </Button>
                      <button 
                        type="button"
                        onClick={() => setAuthView('login')}
                        className="w-full text-sm text-muted-foreground hover:text-primary"
                      >
                        Back to Login
                      </button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-primary via-nhis-blue-dark to-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">{t('portal.welcome')},</p>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                  {user?.name}
                </h1>
                <p className="text-white/60 text-sm">{user?.email}</p>
              </div>
            </div>
            <Button 
              onClick={logout}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-fit"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('portal.logout')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-custom">
          {/* Membership Card with Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Membership Card
                  </CardTitle>
                  <CardDescription>
                    Your official NHIS membership card
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4 mr-2" />
                        View Card
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Your NHIS Membership Card</DialogTitle>
                        <DialogDescription>
                          Download or print your membership card
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-center py-6">
                        <MembershipCard
                          ref={cardRef}
                          name={user?.name || ''}
                          memberId={user?.memberId || ''}
                          expiryDate={user?.expiryDate || ''}
                          registrationDate={user?.registrationDate || ''}
                          status={user?.membershipStatus || 'active'}
                        />
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={handleDownloadCard} className="gap-2">
                          <Download className="w-4 h-4" />
                          Save / Print
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary to-nhis-blue-dark text-white rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-white/60 text-sm mb-1">{t('portal.memberId')}</p>
                        <p className="text-xl font-mono font-bold tracking-wider">{user?.memberId}</p>
                      </div>
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-white/60 text-sm mb-1">Registered</p>
                          <p className="font-medium">{user?.registrationDate}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm mb-1">{t('portal.expiryDate')}</p>
                          <p className="font-medium">{user?.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-white/60 text-sm mb-2">{t('portal.status')}</p>
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold",
                        user?.membershipStatus === 'active' && "bg-nhis-green text-white",
                        user?.membershipStatus === 'expired' && "bg-destructive text-white",
                        user?.membershipStatus === 'pending' && "bg-nhis-yellow text-black"
                      )}>
                        {user?.membershipStatus === 'active' && <CheckCircle2 className="w-5 h-5" />}
                        {user?.membershipStatus === 'expired' && <XCircle className="w-5 h-5" />}
                        {user?.membershipStatus === 'pending' && <Clock className="w-5 h-5" />}
                        {user?.membershipStatus?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="claims" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="claims" className="gap-2">
                  <FileText className="w-4 h-4" />
                  {t('portal.claimsHistory')}
                </TabsTrigger>
                <TabsTrigger value="payments" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  {t('portal.paymentRecords')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="claims">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      {t('portal.claimsHistory')}
                    </CardTitle>
                    <CardDescription>
                      View all your healthcare claims and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {claims.map((claim, index) => (
                        <motion.div
                          key={claim.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 gap-3"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{claim.service}</p>
                            <p className="text-sm text-muted-foreground">{claim.facility}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {claim.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold">GH₵ {claim.amount.toFixed(2)}</p>
                            {getStatusBadge(claim.status)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      {t('portal.paymentRecords')}
                    </CardTitle>
                    <CardDescription>
                      View your premium payment history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((payment, index) => (
                        <motion.div
                          key={payment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 gap-3"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{payment.method}</p>
                            <p className="text-sm text-muted-foreground font-mono">{payment.reference}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {payment.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-semibold">GH₵ {payment.amount.toFixed(2)}</p>
                            {getStatusBadge(payment.status)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MemberPortalPage;
