import { useParams, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Chat() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const avatarId = params.avatarId || '0';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4">
              Chat com Avatar #{avatarId}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              ✅ Página de chat funcionando!
            </p>
            <p className="text-sm text-muted-foreground">
              Esta é uma versão simplificada para testar o roteamento.
              Se você está vendo esta mensagem, a rota está funcionando corretamente.
            </p>
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-medium">
                🎉 Sucesso! A rota /chat/:avatarId está funcionando.
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                Próximo passo: Implementar funcionalidade completa do chat com IA.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
