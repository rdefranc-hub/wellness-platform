const STRIPE_PK = import.meta.env.VITE_STRIPE_PK || '';

export const isStripeConfigured = () => {
  return !!STRIPE_PK;
};

export interface CheckoutResult {
  success: boolean;
  sessionId?: string;
  error?: string;
}

export const checkout = async (planId: string): Promise<CheckoutResult> => {
  // Placeholder: simula checkout do Stripe
  console.log('[Stripe Placeholder] checkout for plan:', planId);
  console.log('[Stripe Placeholder] VITE_STRIPE_PK:', STRIPE_PK || 'not configured');

  if (!STRIPE_PK) {
    return {
      success: false,
      error: 'VITE_STRIPE_PK não configurada',
    };
  }

  // Simula sucesso após 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    sessionId: 'cs_test_' + Date.now(),
  };
};
