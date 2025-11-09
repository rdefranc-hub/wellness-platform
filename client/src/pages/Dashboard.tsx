import AvatarCard from '@/components/AvatarCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import TabelaHistorico from '@/components/TabelaHistorico';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiService, isApiConfigured, isAvatarApiConfigured } from '@/services/api';
import { usePlanStore, useUserStore } from '@/stores/useStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Link } from 'wouter';

function DashboardContent() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { plan } = usePlanStore();
  const [avatares, setAvatares] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [avataresData, historicoData] = await Promise.all([
          apiService.getAvatares(),
          apiService.getHistorico(),
        ]);
        setAvatares(avataresData);
        setHistorico(historicoData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error(t('errors.loadingError'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [t]);

  const handleAttend = (avatarId: string) => {
    // Redirecionar para página de chat
    window.location.href = `/chat/${avatarId}`;
  };

  const planTierLabel = {
    essential: 'Essencial',
    premium: 'Premium',
    enterprise: 'Empresarial',
  };

  const planStatusVariant = {
    active: 'default' as const,
    inactive: 'secondary' as const,
    pending: 'outline' as const,
  };

  const planStatusLabel = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container space-y-8">
          {/* Boas-vindas */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.email || 'Usuário'}!
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus atendimentos e acompanhe seu bem-estar
            </p>
          </div>

          {/* Status do Plano */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.planStatus')}</CardTitle>
              <CardDescription>Informações sobre sua assinatura</CardDescription>
            </CardHeader>
            <CardContent>
              {!isApiConfigured() ? (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {t('errors.configMissing', { variable: 'VITE_API_BASE_URL' })}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      Plano {plan.tier ? planTierLabel[plan.tier] : 'Não definido'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Renovação automática mensal
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        plan.status ? planStatusVariant[plan.status] : 'secondary'
                      }
                    >
                      {plan.status ? planStatusLabel[plan.status] : 'Indefinido'}
                    </Badge>
                    <Button variant="outline" asChild>
                      <Link href="/assinaturas">{t('dashboard.mySubscription')}</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Avatares Disponíveis */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {t('dashboard.availableAvatars')}
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {avatares.map((avatar) => (
                  <AvatarCard
                    key={avatar.id}
                    name={avatar.name}
                    specialty={avatar.specialty}
                    description={avatar.description}
                    imageUrl={avatar.imageUrl}
                    available={avatar.available}
                    onAttend={() => handleAttend(avatar.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Histórico de Atendimentos */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('dashboard.history')}</h2>
            {loading ? (
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ) : (
              <TabelaHistorico atendimentos={historico} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
