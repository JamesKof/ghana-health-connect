import { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MemberPortalPage = () => {
  const { user, isAuthenticated, login, logout, claims, payments } = useDemoAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
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
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t('portal.title')}</CardTitle>
                  <CardDescription>
                    Login to view your membership status, claims history, and payment records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
          {/* Membership Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-primary to-nhis-blue-dark text-white border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
