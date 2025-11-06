import CardPlano from '@/components/CardPlano';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { checkout } from '@/services/stripe';
import { useUserStore } from '@/stores/useStore';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

export default function Assinaturas() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { user } = useUserStore();

  const handleSubscribe = async (planId: string, planName: string) => {
    if (!user) {
      toast.info('Faça login para assinar um plano');
      setLocation('/login');
      return;
    }

    toast.loading('Processando assinatura...');
    
    try {
      const result = await checkout(planId);
      
      if (result.success) {
        toast.success(`Assinatura do plano ${planName} realizada com sucesso!`);
        // Aqui você redirecionaria para o Stripe Checkout ou atualizaria o plano do usuário
      } else {
        toast.error(result.error || 'Erro ao processar assinatura');
      }
    } catch (error) {
      toast.error('Erro ao processar assinatura');
      console.error(error);
    }
  };

  const plans = [
    {
      id: 'essential',
      name: t('subscriptions.essential.name'),
      price: t('subscriptions.essential.price'),
      features: t('subscriptions.essential.features', { returnObjects: true }) as string[],
      popular: false,
    },
    {
      id: 'premium',
      name: t('subscriptions.premium.name'),
      price: t('subscriptions.premium.price'),
      features: t('subscriptions.premium.features', { returnObjects: true }) as string[],
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('subscriptions.enterprise.name'),
      price: t('subscriptions.enterprise.price'),
      features: t('subscriptions.enterprise.features', { returnObjects: true }) as string[],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('subscriptions.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('subscriptions.subtitle')}
            </p>
          </div>

          {/* Grid de Planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <CardPlano
                key={plan.id}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
                onSubscribe={() => handleSubscribe(plan.id, plan.name)}
              />
            ))}
          </div>

          {/* Informações Adicionais */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Todos os planos incluem acesso à plataforma 24/7, suporte técnico e
              garantia de satisfação de 30 dias. Cancele a qualquer momento sem
              taxas adicionais.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
