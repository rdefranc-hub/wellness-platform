import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Sparkles, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

export default function Home() {
  const { t } = useTranslation();

  const specialties = [
    {
      icon: Brain,
      name: 'Psicologia',
      description: 'Suporte emocional e terapia cognitivo-comportamental',
    },
    {
      icon: Heart,
      name: 'Nutrição',
      description: 'Orientação nutricional personalizada',
    },
    {
      icon: Sparkles,
      name: 'Yoga & Meditação',
      description: 'Práticas de bem-estar e mindfulness',
    },
    {
      icon: Users,
      name: 'Coaching',
      description: 'Desenvolvimento pessoal e profissional',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'A plataforma mudou minha vida. Consigo ter acompanhamento psicológico de qualidade sem sair de casa.',
      role: 'Usuária Premium',
    },
    {
      name: 'João Santos',
      text: 'Os avatares são incríveis! A experiência é muito natural e acolhedora.',
      role: 'Usuário Essencial',
    },
    {
      name: 'Ana Costa',
      text: 'Recomendo para toda empresa. Nossos funcionários estão mais saudáveis e produtivos.',
      role: 'Gerente de RH',
    },
  ];

  const faqs = [
    {
      question: 'Como funcionam os avatares de IA?',
      answer:
        'Nossos avatares são alimentados por inteligência artificial avançada, treinados para oferecer suporte empático e personalizado em diversas especialidades de wellness.',
    },
    {
      question: 'Os atendimentos são confidenciais?',
      answer:
        'Sim, todos os atendimentos são completamente confidenciais e seguros. Utilizamos criptografia de ponta a ponta para proteger suas informações.',
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer:
        'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.',
    },
    {
      question: 'Quanto tempo dura cada atendimento?',
      answer:
        'Os atendimentos geralmente duram entre 30 a 60 minutos, dependendo da especialidade e suas necessidades.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
              <Button size="lg" asChild className="mt-8">
                <Link href="/assinaturas">{t('home.hero.cta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Especialidades Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.specialties.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('home.specialties.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((specialty) => (
                <Card key={specialty.name} className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <specialty.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{specialty.name}</CardTitle>
                    <CardDescription>{specialty.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/especialidades">Ver todas as especialidades</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('home.howItWorks.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">
                  {t('home.howItWorks.step1.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.howItWorks.step1.description')}
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">
                  {t('home.howItWorks.step2.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.howItWorks.step2.description')}
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">
                  {t('home.howItWorks.step3.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.howItWorks.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('home.testimonials.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('home.faq.title')}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
