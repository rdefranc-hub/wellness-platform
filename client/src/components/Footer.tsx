import { APP_TITLE } from '@/const';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: t('footer.about'), href: '/sobre' },
    { label: t('footer.privacy'), href: '/privacidade' },
    { label: t('footer.terms'), href: '/termos' },
    { label: t('footer.contact'), href: '/contato' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{APP_TITLE}</h3>
            <p className="text-sm text-muted-foreground">
              Bem-estar ao seu alcance com tecnologia de IA
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Links</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social / Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contato</h4>
            <p className="text-sm text-muted-foreground">
              contato@wellness.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {currentYear} {APP_TITLE}. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
