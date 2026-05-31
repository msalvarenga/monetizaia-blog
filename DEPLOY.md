# Monetiza IA — Deploy no Vercel

## Pré-requisitos
- Node.js 18+ instalado no computador
- Conta gratuita no GitHub (github.com)
- Conta gratuita no Vercel (vercel.com)

---

## Passo 1 — Instalar dependências

Abra o terminal na pasta `monetizaia-blog` e rode:

```bash
npm install
```

---

## Passo 2 — Testar localmente

```bash
npm run dev
```

Acesse http://localhost:3000 — deve aparecer o blog consumindo os artigos do WordPress.

---

## Passo 3 — Subir para o GitHub

1. Crie um repositório novo em github.com (nome: `monetizaia-blog`)
2. Na pasta do projeto:

```bash
git init
git add .
git commit -m "primeiro commit — monetizaia blog"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/monetizaia-blog.git
git push -u origin main
```

---

## Passo 4 — Deploy na Vercel

1. Acesse vercel.com → "Add New Project"
2. Selecione o repositório `monetizaia-blog`
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_WP_URL` = `https://monetizaia.com.br`
   - `NEXT_PUBLIC_SITE_URL` = `https://monetizaia.com.br`
4. Clique **Deploy** — pronto!

---

## Passo 5 — Apontar domínio

Na Vercel:
1. Vá em Settings → Domains
2. Adicione `monetizaia.com.br`
3. A Vercel mostrará os DNS records — adicione no Hostinger:
   - No Hostinger hPanel → DNS Zone → adicione os registros

**Importante:** O WordPress continuará rodando normalmente como CMS headless.
O Next.js é só o "rosto" do site.

---

## Estrutura de arquivos

```
monetizaia-blog/
├── app/
│   ├── layout.js          — Layout global (Navbar + Footer)
│   ├── page.js            — Homepage editorial
│   ├── globals.css        — Estilos globais + Tailwind
│   ├── [slug]/
│   │   └── page.js        — Página de artigo individual
│   └── categoria/
│       └── [slug]/
│           └── page.js    — Página de categoria
├── components/
│   ├── Navbar.js          — Header fixo com busca + dark mode
│   ├── Footer.js          — Rodapé sofisticado
│   ├── ArticleCard.js     — Cards: Hero, Grid, Horizontal, Side
│   ├── Sidebar.js         — Sidebar: trending, categorias, newsletter
│   └── ReadingProgress.js — Barra de progresso de leitura
├── lib/
│   └── wordpress.js       — Funções para consumir WP REST API
├── tailwind.config.js
├── next.config.js
└── package.json
```
