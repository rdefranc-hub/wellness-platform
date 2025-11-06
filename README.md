# Wellness Platform - Teleatendimento com Avatares IA

Plataforma de wellness e teleatendimento que conecta usuários com especialistas através de avatares de inteligência artificial.

## 🚀 Tecnologias

- **React 19** - Framework frontend
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI de alta qualidade
- **Wouter** - Roteamento leve para React
- **Zustand** - Gerenciamento de estado
- **i18next** - Internacionalização (pt-BR)
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## 📋 Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd wellness-platform
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` (ou configure via interface de Settings):

```env
# API Base URL - URL base da API backend
VITE_API_BASE_URL=https://api.exemplo.com

# Avatar API URL - URL da API de avatares de IA
VITE_AVATAR_API_URL=https://avatar-api.exemplo.com

# Stripe Public Key - Chave pública do Stripe para pagamentos
VITE_STRIPE_PK=pk_test_...
```

**Nota:** As variáveis acima são opcionais para desenvolvimento. O app funcionará com dados mockados se não forem configuradas, mas exibirá mensagens de placeholder.

## 🏃 Executando o projeto

### Modo de desenvolvimento

```bash
pnpm dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para produção

```bash
pnpm build
```

### Preview da build de produção

```bash
pnpm preview
```

## 📁 Estrutura do Projeto

```
wellness-platform/
├── client/
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── ui/            # Componentes shadcn/ui
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CardEspecialidade.tsx
│   │   │   ├── CardPlano.tsx
│   │   │   ├── AvatarCard.tsx
│   │   │   ├── TabelaHistorico.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/             # Páginas da aplicação
│   │   │   ├── Home.tsx
│   │   │   ├── Especialidades.tsx
│   │   │   ├── Assinaturas.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── NotFound.tsx
│   │   ├── stores/            # Stores Zustand
│   │   │   └── useStore.ts
│   │   ├── services/          # Serviços de API
│   │   │   ├── api.ts
│   │   │   └── stripe.ts
│   │   ├── lib/               # Utilitários
│   │   │   ├── i18n.ts
│   │   │   └── trpc.ts
│   │   ├── locales/           # Traduções
│   │   │   └── pt-BR.json
│   │   ├── App.tsx            # Componente raiz
│   │   └── main.tsx           # Entry point
│   └── public/                # Arquivos estáticos
├── server/                    # Backend (tRPC + Express)
├── drizzle/                   # Schema do banco de dados
└── README.md
```

## 🎨 Funcionalidades

### Páginas Públicas

- **Home (/)**: Landing page com hero, especialidades, como funciona, depoimentos e FAQ
- **Especialidades (/especialidades)**: Grade de especialidades com filtros por tags
- **Assinaturas (/assinaturas)**: Planos Essencial, Premium e Empresarial
- **Login (/login)**: Autenticação com tabs para login e cadastro

### Páginas Protegidas

- **Dashboard (/dashboard)**: Área logada com:
  - Boas-vindas personalizadas
  - Status do plano de assinatura
  - Lista de avatares disponíveis
  - Histórico de atendimentos
  - Link para gerenciar assinatura

### Componentes Principais

- **Header**: Navegação responsiva com menu mobile, dark mode e área de usuário
- **Footer**: Links institucionais e informações de contato
- **CardEspecialidade**: Card de especialidade com ícone, descrição e tags
- **CardPlano**: Card de plano de assinatura com features e CTA
- **AvatarCard**: Card de avatar com status de disponibilidade
- **TabelaHistorico**: Tabela de histórico de atendimentos
- **ProtectedRoute**: Guard de rota para páginas autenticadas

## 🔐 Autenticação

O sistema usa Zustand para gerenciar o estado de autenticação:

- Login e cadastro com validação de email e senha
- Redirecionamento automático para `/login` em rotas protegidas
- Persistência de sessão no localStorage
- Logout com limpeza de estado

## 🎨 Temas

O aplicativo suporta modo claro e escuro:

- Toggle de tema no Header
- Persistência da preferência do usuário
- Cores semânticas do Tailwind CSS

## 🌐 Internacionalização

Atualmente suporta português brasileiro (pt-BR) com i18next:

- Todas as strings da interface são traduzíveis
- Arquivo de tradução em `client/src/locales/pt-BR.json`
- Fácil adição de novos idiomas

## 🔌 Integrações (Placeholder)

### API Backend
- Configurável via `VITE_API_BASE_URL`
- Métodos implementados: login, register, getMe, getAvatares, getHistorico
- Atualmente usa dados mockados

### Avatar API
- Configurável via `VITE_AVATAR_API_URL`
- Método: startAtendimento
- Placeholder para integração futura

### Stripe
- Configurável via `VITE_STRIPE_PK`
- Função checkout implementada como placeholder
- Pronta para integração real

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Preview da build
pnpm db:push      # Sincroniza schema do banco de dados
pnpm lint         # Executa linter
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através de:
- Email: contato@wellness.com
- Website: https://wellness.com

---

Desenvolvido com ❤️ para promover bem-estar através da tecnologia.
