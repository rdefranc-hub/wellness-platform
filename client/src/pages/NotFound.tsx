import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">{t('notFound.title')}</h2>
            <p className="text-muted-foreground">{t('notFound.description')}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              {t('notFound.backHome')}
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
