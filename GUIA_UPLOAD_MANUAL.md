# GUIA DE UPLOAD MANUAL - Wellness Platform

## 🎯 OBJETIVO

Fazer upload manual dos arquivos corretos para o servidor HostGator, pois o GitHub Actions FTP deploy não está funcionando.

## 📦 ARQUIVO PARA UPLOAD

**Nome:** `wellness_final.zip`  
**Tamanho:** ~210 KB  
**Contém:**
- `index.html` (1.1 KB)
- `assets/index-CCuT78gt-1762713622889.js` (632 KB) ← COM DEBUG LOGS
- `assets/index-Dog_S9dp.css` (82 KB)

## 📍 PASSO A PASSO DETALHADO

### PASSO 1: Acessar cPanel
1. Faça login no cPanel do HostGator
2. Procure por "File Manager" ou "Gerenciador de arquivos"
3. Clique para abrir

### PASSO 2: Navegar para public_html
1. Na árvore de pastas à esquerda, clique em `public_html`
2. Você verá os arquivos atuais do site

### PASSO 3: DELETAR arquivos antigos
1. Selecione o arquivo `index.html`
2. Clique em **"Delete"** ou **"Deletar"**
3. Confirme a exclusão

4. Selecione a pasta `assets/`
5. Clique em **"Delete"** ou **"Deletar"**
6. Confirme a exclusão

### PASSO 4: UPLOAD do ZIP
1. Clique no botão **"Upload"** ou **"Carregar"** no topo
2. Selecione o arquivo `wellness_final.zip`
3. Aguarde o upload completar (será rápido, ~210 KB)
4. Volte para o File Manager

### PASSO 5: EXTRAIR o ZIP
1. Você verá `wellness_final.zip` na lista de arquivos
2. Clique com **botão direito** no ZIP
3. Selecione **"Extract"** ou **"Extrair"**
4. Confirme (deixe extrair na pasta atual: `public_html/`)
5. Aguarde a extração completar

### PASSO 6: VERIFICAR estrutura
Após extrair, você deve ver:
```
public_html/
├── index.html (NOVO - 1.1 KB)
├── assets/
│   ├── index-CCuT78gt-1762713622889.js (NOVO - 632 KB)
│   └── index-Dog_S9dp.css (82 KB)
└── wellness_final.zip (pode deletar depois)
```

### PASSO 7: DELETAR o ZIP (opcional)
1. Selecione `wellness_final.zip`
2. Clique em **"Delete"**
3. Confirme

### PASSO 8: VERIFICAR
1. Clique na pasta `assets/`
2. Verifique se o arquivo `index-CCuT78gt-1762713622889.js` está lá
3. Verifique o tamanho: deve ser ~632 KB
4. Verifique a data: deve ser HOJE

## ✅ CONFIRMAÇÃO

Depois de completar, me envie uma screenshot da pasta `assets/` mostrando:
- Nome do arquivo: `index-CCuT78gt-1762713622889.js`
- Tamanho: 632 KB (ou próximo)
- Data: Hoje

## 🚀 PRÓXIMO PASSO

Assim que você confirmar que fez o upload, eu vou:
1. Testar o site em produção
2. Verificar os logs de debug no console
3. Validar que o React Router está funcionando
4. Testar login, dashboard e chat

## ⚠️ TROUBLESHOOTING

**Se a pasta assets não aparecer após extrair:**
- Pode ser que o ZIP criou uma subpasta `wellness_final/`
- Nesse caso, mova os arquivos de dentro para `public_html/`

**Se o arquivo JS não aparecer:**
- Verifique se você extraiu o ZIP corretamente
- Tente fazer upload direto do arquivo JS (sem ZIP)

**Se tiver dúvidas:**
- Me envie screenshots do que você está vendo
- Eu te guio passo a passo!
