import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiService } from '@/services/api';
import { usePlanStore, useUserStore } from '@/stores/useStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setPlan } = usePlanStore();

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!signInEmail) {
      toast.error(t('login.errors.emailRequired'));
      return;
    }
    if (!validateEmail(signInEmail)) {
      toast.error(t('login.errors.emailInvalid'));
      return;
    }
    if (!signInPassword) {
      toast.error(t('login.errors.passwordRequired'));
      return;
    }
    if (signInPassword.length < 6) {
      toast.error(t('login.errors.passwordMin'));
      return;
    }

    setSignInLoading(true);

    try {
      const user = await apiService.login({
        email: signInEmail,
        password: signInPassword,
      });

      setUser({
        id: user.id,
        email: user.email,
        token: user.token,
      });

      // Simular plano ativo
      setPlan({
        tier: 'premium',
        status: 'active',
      });

      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!signUpName) {
      toast.error(t('login.errors.nameRequired'));
      return;
    }
    if (!signUpEmail) {
      toast.error(t('login.errors.emailRequired'));
      return;
    }
    if (!validateEmail(signUpEmail)) {
      toast.error(t('login.errors.emailInvalid'));
      return;
    }
    if (!signUpPassword) {
      toast.error(t('login.errors.passwordRequired'));
      return;
    }
    if (signUpPassword.length < 6) {
      toast.error(t('login.errors.passwordMin'));
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      toast.error(t('login.errors.passwordMatch'));
      return;
    }

    setSignUpLoading(true);

    try {
      const user = await apiService.register({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      });

      setUser({
        id: user.id,
        email: user.email,
        token: user.token,
      });

      // Simular plano ativo
      setPlan({
        tier: 'essential',
        status: 'active',
      });

      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.');
      console.error(error);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
              <CardDescription>
                Acesse sua conta ou crie uma nova para começar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">{t('login.signIn')}</TabsTrigger>
                  <TabsTrigger value="signup">{t('login.signUp')}</TabsTrigger>
                </TabsList>

                {/* Sign In Tab */}
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">{t('login.email')}</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        disabled={signInLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">{t('login.password')}</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        disabled={signInLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={signInLoading}>
                      {signInLoading ? 'Entrando...' : t('login.signInButton')}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">{t('login.name')}</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        disabled={signUpLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t('login.email')}</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        disabled={signUpLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t('login.password')}</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        disabled={signUpLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">
                        {t('login.confirmPassword')}
                      </Label>
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        disabled={signUpLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={signUpLoading}>
                      {signUpLoading ? 'Criando conta...' : t('login.signUpButton')}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
