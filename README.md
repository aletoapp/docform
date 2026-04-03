# ⚖ DocForm

> **Transforme textos gerados por IA em documentos profissionais e juridicamente formatados — instalável como app, funciona offline.**

![DocForm Preview](assets/og.jpg)

[![PWA](https://img.shields.io/badge/PWA-instalável-c9a84c?style=flat-square&logo=googlechrome&logoColor=white)](https://seu-usuario.github.io/docform)
[![Lighthouse PWA](https://img.shields.io/badge/Lighthouse%20PWA-≥%2090-3fb950?style=flat-square&logo=lighthouse&logoColor=white)](#qualidade)
[![Offline](https://img.shields.io/badge/Offline-✓%20funciona-3fb950?style=flat-square)](#service-worker)
[![License](https://img.shields.io/badge/licença-MIT-8b95a2?style=flat-square)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-0d1117?style=flat-square&logo=github&logoColor=white)](#deploy)

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Demo](#demo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Deploy no GitHub Pages](#deploy-no-github-pages)
- [PWA — Instalação como App](#pwa--instalação-como-app)
- [Service Worker — Estratégia Híbrida](#service-worker--estratégia-híbrida)
- [Auto-Fill Engine](#auto-fill-engine)
- [Exportação PDF e DOCX](#exportação-pdf-e-docx)
- [Design System](#design-system)
- [Qualidade e Lighthouse](#qualidade-e-lighthouse)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Visão Geral

O **DocForm** é uma aplicação web progressiva (PWA) que transforma texto bruto — gerado por ChatGPT, Gemini, Claude ou qualquer IA — em documentos com formatação jurídica e profissional, prontos para impressão ou assinatura digital via **Gov.br / ICP-Brasil**.

```
Cole o texto  →  Auto-detecta o tipo  →  Preenche o cabeçalho  →  Gera o PDF
```

Não há backend, banco de dados nem login. Tudo roda no browser do usuário — incluindo a geração de PDF, DOCX e o cache offline.

---

## Funcionalidades

### 📄 Formatador de Documentos
- **12 presets jurídicos**: Aluguel residencial/comercial, Prestação de serviços, NDA, Compra e venda, CLT, Freelance, Empréstimo e mais
- **Detecção automática de tipo**: fingerprint por palavras-chave com score de confiança
- **Auto-Fill Engine**: extrai título, cidade, data, número e partes diretamente do texto colado
- Logotipo e marca d'água personalizados (PNG/JPG/SVG)
- Opções de assinatura: Gov.br, ICP-Brasil, testemunhas
- Numeração de cláusulas, paginação, rodapé configuráveis
- Preview A4 fiel antes da exportação

### 📋 Gerador de Currículo 2026
- Formulário completo: dados pessoais, experiências, formação, cursos, idiomas, habilidades
- Foto profissional, redes sociais e links
- Campos vazios não aparecem no PDF gerado
- Exportação PDF e DOCX (Word compatível)

### 📧 E-mail Formal
- Formatação corporativa com cabeçalho, corpo e assinatura estruturados
- Exportação PDF e DOCX

### 📲 App Instalável (PWA)
- Funciona offline após a primeira visita
- Instalável no Android (Chrome) e desktop (Chrome/Edge)
- Ícones, splash screen e modo standalone
- Shortcuts nativos para "Formatar" e "Currículo"

---

## Demo

🔗 **[docform.app](https://docform.app)** *(ou seu GitHub Pages após o deploy)*

---

## Estrutura do Projeto

```
docform/
│
├── index.html              # App principal (SPA)
├── manifest.json           # PWA Web App Manifest
├── sw.js                   # Service Worker (estratégia híbrida)
│
├── styles.css              # Design system completo
│   └── (tokens, layout, cards, forms, doc preview, PWA UI)
│
├── script.js               # Toda a lógica da aplicação
│   ├── Auto-Fill Engine    # analisarTextoInteligente()
│   ├── Auto-Detect         # autoDetect() com fingerprints
│   ├── Text Processing     # processText() → renderização A4
│   ├── PDF Export          # jsPDF — vetorial, multi-página
│   ├── DOCX Export         # docx.js — Word real
│   ├── Currículo           # gerarCV() + exportarPDF/DOCX
│   ├── E-mail Formal       # formatarEmail() + export
│   └── PWA Init            # initPWA() — SW + install prompt
│
└── assets/
    ├── img/
    │   ├── favicon.png
    │   ├── icon-192.png    # PWA icon
    │   └── icon-512.png    # PWA icon (splash / maskable)
    └── og.jpg              # Open Graph / redes sociais
```

> **Nota:** `styles.css` e `script.js` ficam na raiz junto ao `index.html` para que o Service Worker os cache corretamente com escopo `./`.

---

## Deploy no GitHub Pages

### 1. Fork / clone

```bash
git clone https://github.com/seu-usuario/docform.git
cd docform
```

### 2. Configure o repositório

```bash
# Verifique se os arquivos estão na raiz
ls index.html manifest.json sw.js styles.css script.js
```

### 3. Ative o GitHub Pages

No repositório → **Settings → Pages → Source: Deploy from branch → `main` → `/ (root)`** → Save.

A URL gerada será:

```
https://seu-usuario.github.io/docform/
```

### 4. Ajuste o `start_url` no manifest.json

Se o repositório for um **subpath** (ex: `github.io/docform`), atualize:

```json
{
  "start_url": "/docform/",
  "scope": "/docform/"
}
```

E no `sw.js`, ajuste os caminhos do `PRE_CACHE`:

```javascript
const PRE_CACHE = [
  '/docform/',
  '/docform/index.html',
  '/docform/styles.css',
  '/docform/script.js',
  '/docform/manifest.json',
  // ... CDNs
];
```

> **Domínio customizado?** Com CNAME (ex: `docform.app`), mantenha `start_url: "./"` — os caminhos relativos funcionam automaticamente.

### 5. HTTPS obrigatório

O Service Worker e o `beforeinstallprompt` **exigem HTTPS**. O GitHub Pages fornece HTTPS automaticamente (incluindo domínios customizados com CNAME).

---

## PWA — Instalação como App

### Como funciona

```
1. Usuário acessa o site via Chrome/Edge (Android ou desktop)
2. O browser detecta: HTTPS + manifest.json + SW ativo
3. Dispara 'beforeinstallprompt' → banner "Instalar DocForm" aparece após 3s
4. Ao instalar: ícone na tela inicial, abre sem barra do browser (standalone)
5. Offline: tudo continua funcionando via cache do SW
```

### Banner de instalação

O banner é exibido automaticamente quando:
- O usuário está em Chrome/Edge (Android ou desktop)
- O site é servido via HTTPS
- O SW está registrado e ativo
- O usuário não clicou em "Agora não" na sessão atual

```javascript
// Controle via sessionStorage — não irrita o usuário
sessionStorage.setItem('pwa-dismissed', '1');  // suprido após dismiss
```

### Shortcuts do manifest

Ao segurar o ícone no Android, aparecem atalhos diretos:

| Shortcut | URL | Descrição |
|---|---|---|
| Formatar Documento | `?page=formatar` | Abre direto no editor |
| Criar Currículo | `?page=curriculo` | Abre o formulário de CV |

---

## Service Worker — Estratégia Híbrida

O `sw.js` implementa três estratégias diferentes por tipo de recurso, balanceando **frescor** vs **velocidade**:

| Recurso | Estratégia | Motivo |
|---|---|---|
| `HTML` / navegação | **Network First** | Sempre serve a versão mais recente; fallback para cache se offline |
| `CSS` / `JS` / CDNs | **Stale While Revalidate** | Resposta imediata do cache + atualiza em background |
| Imagens / fontes | **Cache First** | Alta vida útil; raramente mudam |
| Google Fonts | **Cache First** | Fontes não mudam; evita requisição desnecessária |

### Ciclo de vida

```
INSTALL  → pré-cacheia index.html, styles.css, script.js, manifest.json, CDNs
ACTIVATE → limpa caches de versões antigas; assume controle de todos os tabs
FETCH    → roteia cada requisição pela estratégia correta
```

### Atualização automática

Quando uma nova versão do SW é detectada, um toast notifica o usuário:

```
🔄 Nova versão disponível — recarregue para atualizar
```

### Cache offline inclui

- App shell completo (HTML + CSS + JS)
- Bibliotecas de export: **jsPDF**, **FileSaver.js**, **docx.js**
- Fontes: **EB Garamond**, **DM Sans**, **DM Mono**

> Isso significa que **geração de PDF e DOCX funcionam completamente offline** após a primeira visita.

---

## Auto-Fill Engine

O `analisarTextoInteligente(text)` é o núcleo inteligente do DocForm. Ao colar ou digitar no textarea, ele executa um pipeline em 4 etapas:

```
Normalize → Pattern Extraction → Confidence Score → Apply Fields → UI Feedback
```

### Campos extraídos automaticamente

| Campo | Padrão detectado | Confiança |
|---|---|---|
| **Título** | Linha em CAIXA ALTA, ≥ 3 palavras, charset jurídico | 90% |
| **Cidade / Estado** | `São Paulo – SP`, `em São Paulo,`, `Local: SP` | 72–88% |
| **Data** | `2 de abril de 2026` → converte para `YYYY-MM-DD` | 85% |
| **Número / Ref.** | `Nº 001/2026`, `Contrato 12/2025`, `Ref.: ABC-01` | 80% |
| **Assinante 1 e 2** | `Contratante: João Silva`, `Locador: ...` | 82% |
| **Tipo de documento** | Fingerprint de palavras-chave (score ≥ 2 sugere, ≥ 4 aplica) | variável |

### Thresholds de aplicação

```javascript
const AF_THRESHOLD_APPLY   = 60;  // aplica automaticamente
const AF_THRESHOLD_SUGGEST = 35;  // sugere no painel, mas não aplica
const CM_SCORE_SUGGEST     = 2;   // mínimo para sugerir tipo
const CM_SCORE_AUTO        = 4;   // aplica preset automaticamente
```

### Proteção anti-loop

O engine **nunca sobrescreve dados já digitados pelo usuário**:

```javascript
// Só preenche se o campo estiver vazio
// Exceção: título pode ser substituído se for um valor de preset padrão
if (current && id !== 'doc-titulo') return false;
```

### Feedback visual

Campos preenchidos automaticamente recebem um flash verde + borda animada (`glowFill`) e são listados no painel **"🧠 Auto-Fill detectou N campos"** com o percentual de confiança de cada um.

---

## Exportação PDF e DOCX

### PDF — jsPDF (vetorial)

- Gerado no browser, sem servidor
- Multi-página automático com paginação
- Margens jurídicas padrão OAB/Tribunais: `30×20×20×20 mm`
- Fontes embutidas (não granuladas)
- Marca d'água posicionável (centro, cantos)
- Suporte a logotipo no cabeçalho

### DOCX — docx.js (Word real)

- Compatível com Microsoft Word, LibreOffice, Google Docs
- Estilos de parágrafo, tab stops e hierarquia de títulos
- Gerado como Blob diretamente no browser via `FileSaver.js`
- Disponível para: Contrato, Currículo e E-mail Formal

### Dependências de terceiros (CDN + cache offline)

```html
<!-- jsPDF -->
https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js

<!-- FileSaver.js -->
https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js

<!-- docx.js -->
https://unpkg.com/docx@8.5.0/build/index.umd.js
```

Todas são pré-cacheadas pelo Service Worker na instalação do PWA.

---

## Design System

### Tokens de cor (CSS Variables)

```css
--bg:          #0a0d12   /* Fundo principal */
--surface:     #141920   /* Cards */
--ink:         #c9a84c   /* Dourado — cor de destaque */
--ink-hi:      #e8c97a   /* Dourado claro */
--text:        #dde4ec   /* Texto primário */
--text-2:      #8b95a2   /* Texto secundário */
--ok:          #3fb950   /* Verde sucesso */
--err:         #f85149   /* Vermelho erro */
```

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Serif | `EB Garamond` | Títulos, logo, headers de documentos |
| Sans | `DM Sans` | Corpo, labels, UI geral |
| Mono | `DM Mono` | Badges, metadados, código |

### Breakpoints

```css
@media (max-width: 740px)  /* Mobile: oculta sidebar, exibe bottom nav */
@media (max-width: 400px)  /* Telas pequenas: grid compactado */
@media print               /* Impressão: oculta UI, exibe apenas o documento */
```

---

## Qualidade e Lighthouse

### Critérios de qualidade

| Critério | Status |
|---|---|
| Auto-fill preenche título + cidade + partes | ✅ |
| Não sobrescreve dados do usuário | ✅ |
| Feedback visual imediato (glowFill) | ✅ |
| Funciona sem internet | ✅ |
| Instalável (Chrome + Android) | ✅ |
| Lighthouse PWA ≥ 90 | ✅ |

### Como auditar com Lighthouse

1. Abra o DocForm no Chrome
2. DevTools → **Lighthouse** → selecione **Progressive Web App**
3. Clique em **Analyze page load**

**Pontos verificados pelo Lighthouse PWA:**
- `manifest.json` com `name`, `short_name`, `icons` (192 e 512px), `start_url`, `display: standalone`
- Service Worker registrado e ativo
- HTTPS habilitado
- Viewport configurado
- Splash screen (background + theme color + ícone)

---

## Roadmap

### v1.1
- [ ] Salvar rascunhos no `localStorage` (persistência entre sessões)
- [ ] Histórico de documentos gerados
- [ ] Tema claro (light mode)

### v1.2
- [ ] Modelos adicionais: Procuração, Declaração, Ata de Reunião
- [ ] Assinatura digital inline (canvas)
- [ ] QR Code com hash do documento

### v2.0
- [ ] Editor de cláusulas drag-and-drop
- [ ] Integração com API Gov.br para assinatura digital
- [ ] Modo colaborativo (link compartilhável)

---

## Contribuindo

Contribuições são bem-vindas! Siga o processo abaixo:

```bash
# 1. Fork o repositório
# 2. Crie uma branch
git checkout -b feature/minha-feature

# 3. Faça suas alterações
# 4. Commit semântico
git commit -m "feat: adiciona modelo de procuração"

# 5. Push e abra um Pull Request
git push origin feature/minha-feature
```

### Convenções de commit

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Ajustes visuais sem lógica |
| `docs:` | Documentação |
| `refactor:` | Refatoração sem nova feature |
| `perf:` | Melhoria de performance |

### Reportar bugs

Abra uma [Issue](../../issues) com:
- Navegador e versão
- Passos para reproduzir
- Screenshot se possível

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML5 / CSS3 / JS | Vanilla | App inteiro — zero frameworks |
| jsPDF | 2.5.1 | Geração de PDF no browser |
| docx.js | 8.5.0 | Geração de DOCX no browser |
| FileSaver.js | 2.0.5 | Download de arquivos |
| EB Garamond | Google Fonts | Tipografia serif |
| DM Sans / Mono | Google Fonts | Tipografia sans e mono |
| Service Worker API | — | Cache offline |
| Web App Manifest | — | PWA instalável |

---

## Licença

Distribuído sob a licença **MIT**. Veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**DocForm** · Feito com ⚖ · 2026

*"O usuário não deve preencher formulário. O sistema deve entender o texto."*

</div>
