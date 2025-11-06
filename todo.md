# Wellness Platform - TODO

## Configuração Inicial
- [x] Instalar dependências: React Router, Zustand, shadcn/ui, Lucide icons
- [x] Configurar i18n (pt-BR)
- [x] Configurar ESLint e Prettier (já vem configurado no template)
- [x] Criar arquivo .env.example (via webdev_request_secrets)

## Componentes Compartilhados
- [x] Header com logo, menu e suporte a dark mode
- [x] Footer com links institucionais
- [x] CardEspecialidade
- [x] CardPlano
- [x] AvatarCard
- [x] TabelaHistorico
- [x] Sistema de Alertas/Toasts (usando sonner do shadcn)
- [x] Guard de rota (ProtectedRoute)

## Stores Zustand
- [x] Store de usuário (user: id, email, token)
- [x] Store de plano (plan: tier, status)
- [x] Store de UI (ui: theme)

## Serviços API
- [x] Configurar baseURL com VITE_API_BASE_URL
- [x] Implementar login(email, senha)
- [x] Implementar register(data)
- [x] Implementar getMe()
- [x] Implementar getAvatares()
- [x] Implementar startAtendimento(avatarId)
- [x] Implementar getHistorico()
- [x] Placeholder para integração Stripe (VITE_STRIPE_PK)
- [x] Placeholder para integração Avatar API (VITE_AVATAR_API_URL)

## Páginas Públicas
- [x] Home (/): Hero com CTA, Especialidades, Como funciona, Depoimentos, FAQ
- [x] Especialidades (/especialidades): Grade com filtros, cards clicáveis
- [x] Assinaturas (/assinaturas): Planos Essencial, Premium, Empresarial
- [x] Login (/login): Tabs Entrar/Criar conta, validação

## Páginas Protegidas
- [x] Dashboard (/dashboard): Boas-vindas, status do plano, avatares disponíveis, histórico
- [x] Página 404 (/404)

## Rotas e Navegação
- [x] Configurar React Router com todas as rotas
- [x] Implementar rota protegida (redirect para /login se não autenticado)
- [x] Integrar navegação no Header

## Qualidade e UX
- [x] Layout responsivo (mobile-first)
- [x] Tipografia moderna
- [x] Ícones Lucide
- [x] Acessibilidade (aria-labels, semântica)
- [x] Mensagens de placeholder quando env não configurada

## Documentação
- [x] README com instruções de instalação e execução
- [x] Documentar variáveis de ambiente
