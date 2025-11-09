# Guia Passo a Passo para Continuar o Projeto

**Data:** 09 de novembro de 2025

## 1. Visão Geral

Este guia detalha os passos para fazer o build final, deploy e validação do projeto Wellness Platform na sua nova conta Manus.

## 2. Passos para Continuar

### PASSO 1: Fazer Build Final

1.  **Abra um terminal** no ambiente Manus.
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd /home/ubuntu/wellness-platform
    ```
3.  **Execute o comando de build:**
    ```bash
    npm run build
    ```
4.  **Verifique os arquivos gerados** na pasta `client/dist/`.

### PASSO 2: Preparar Arquivos para Upload

1.  **Crie um arquivo ZIP** com os arquivos de build:
    ```bash
    cd /home/ubuntu/wellness-platform/client/dist
    zip -r /home/ubuntu/wellness_final_build.zip index.html assets/
    ```
2.  **Baixe o arquivo ZIP** para o seu computador.

### PASSO 3: Fazer Upload para HostGator

1.  **Acesse o cPanel** do HostGator.
2.  **Abra o File Manager** e navegue até `public_html/`.
3.  **DELETE** os arquivos `index.html` e a pasta `assets/` existentes.
4.  **UPLOAD** do arquivo `wellness_final_build.zip`.
5.  **EXTRAIA** o ZIP na pasta `public_html/`.

### PASSO 4: Validar em Produção

1.  **Acesse o site:** https://clubedavida.online/
2.  **Teste todas as funcionalidades:**
    -   Navegação para #/login
    -   Login com credenciais de teste
    -   Acesso ao dashboard
    -   Navegação para o chat

## 3. Próximos Passos (Backend)

1.  **Configure o backend tRPC** na pasta `server/`.
2.  **Faça deploy do servidor** Node.js.
3.  **Conecte ao banco de dados** MySQL.
4.  **Adicione as chaves de API** do Gemini.

---

**Seguindo estes passos, você conseguirá finalizar o projeto com sucesso!**
