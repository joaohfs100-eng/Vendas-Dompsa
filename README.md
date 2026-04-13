# Vendas Dompsa - Premium Edition

Sistema de controle de vendas, estoque e cobranças via WhatsApp.

**Desenvolvido por J. Fernandes**

## Funcionalidades

- Dashboard com métricas do mês atual e anterior
- Registro de vendas com data personalizável
- Controle de estoque com alertas automáticos
- Gestão de clientes com filtros (Todos, Pagos, Devendo, Meses Ant.)
- Filtro por Cia (Cia Dob, Cplc, Manut, Ccap)
- Cobrança via WhatsApp com mensagem personalizável
- Relatório de pendentes agrupado por Cia
- Exportação para Word (.docx)
- Backup e restauração de dados
- Funciona 100% offline (PWA)
- Compatível com Android e iOS

## Como publicar no GitHub Pages

### Passo 1: Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde)
3. Dê o nome: `vendas-dompsa`
4. Marque como **Public**
5. Clique em **"Create repository"**

### Passo 2: Fazer upload dos arquivos

1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste todos os arquivos desta pasta:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - Pasta `icons/` (com todos os ícones)
3. Clique em **"Commit changes"**

### Passo 3: Ativar o GitHub Pages

1. No repositório, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Em "Branch", selecione **main** e pasta **/ (root)**
5. Clique em **Save**

### Passo 4: Acessar o app

Após alguns minutos, seu app estará disponível em:

```
https://SEU-USUARIO.github.io/vendas-dompsa/
```

## Estrutura do Projeto

```
vendas-dompsa/
├── index.html          # Aplicativo principal
├── manifest.json       # Configurações do PWA
├── sw.js               # Service Worker (cache offline)
├── README.md           # Este arquivo
└── icons/              # Ícones do app
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## Instalar como App no Celular

### Android (Chrome)
1. Abra o link do GitHub Pages no Chrome
2. Toque no menu (3 pontinhos)
3. Selecione **"Adicionar à tela inicial"**
4. O app aparecerá como um ícone no seu celular

### iPhone (Safari)
1. Abra o link do GitHub Pages no Safari
2. Toque no botão de **compartilhar** (quadrado com seta)
3. Selecione **"Adicionar à Tela de Início"**
4. O app aparecerá como um ícone no seu iPhone
