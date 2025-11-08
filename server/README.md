# Wellness Platform - Backend

## 🤖 Sistema de Avatares de IA

Backend completo para plataforma de bem-estar com avatares de IA.

### ✅ Implementado

- tRPC API
- Drizzle ORM (MySQL)
- 8 avatares profissionais
- Chat com Gemini 2.5 Flash
- Histórico de conversas
- Autenticação OAuth

### 🚀 Quick Start

1. **Configurar banco:**
```bash
mysql -u root -p
CREATE DATABASE wellness_platform;
```

2. **Aplicar migrations:**
```bash
mysql -u wellness -p wellness_platform < ../drizzle/0001_wellness_tables.sql
```

3. **Popular avatares:**
```bash
npx tsx seed-avatars.ts
```

4. **Iniciar servidor:**
```bash
cd ..
npm run dev
```

### 📚 Documentação

Ver arquivos em `/home/ubuntu/Downloads/`:
- `QUICK_START.md` - Início rápido (10 min)
- `SETUP_BACKEND.md` - Setup completo
- `ROADMAP_AVATARES_IA.md` - Roadmap futuro
- `RESUMO_FINAL.md` - Visão geral

### 🎯 Avatares Disponíveis

1. Dra. Ana Silva - Psicologia
2. Dr. Carlos Santos - Nutrição
3. Dra. Maria Costa - Yoga & Meditação
4. Coach Paulo Mendes - Coaching
5. Prof. Ricardo Lima - Fitness
6. Dra. Beatriz Alves - Cardiologia
7. Dr. Fernando Rocha - Fisioterapia
8. Instrutora Sofia Martins - Técnicas de Respiração

### 💰 Custo

**R$ 0/mês** (usando Manus Forge + PlanetScale free tier)

### 🔌 API Endpoints

- `avatars.list` - Lista avatares
- `avatars.getById` - Detalhes do avatar
- `avatars.myHistory` - Histórico do usuário
- `chat.startSession` - Inicia sessão
- `chat.sendMessage` - Envia mensagem
- `chat.getHistory` - Histórico da sessão
- `chat.endSession` - Finaliza sessão

---

**Pronto para uso!** 🚀
