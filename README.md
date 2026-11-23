# Jardim Exótico — loja virtual

Migração do site estático (HTML + SCSS + JS) para **Next.js 16 (App Router) + TypeScript + Redux Toolkit + Jest**, mantendo a identidade visual (verde-musgo, branco limpo, Open Sans / Montserrat Light / Mali).

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run validate     # lint + tipos + testes + build (o mesmo que roda no CI)
```

| Script | O que faz |
| --- | --- |
| `npm run dev` / `build` / `start` | Desenvolvimento, build e servidor de produção |
| `npm run lint` | ESLint (config oficial do Next + regras de TypeScript) |
| `npm run typecheck` | `tsc --noEmit` em modo `strict` |
| `npm test` / `test:coverage` | Jest + React Testing Library |

## Arquitetura

```
src/
  app/                 Rotas (App Router). (loja) tem header/rodapé; (auth) é tela cheia
  components/          home/ product/ cart/ catalog/ checkout/ auth/ blog/ layout/ ui/
  data/                Catálogo, posts, depoimentos e cupons (fonte única de verdade)
  lib/                 Regras puras e testáveis: dinheiro, cupons, filtros/busca, validação, hash
  lib/i18n/            Dicionário pt-BR / en-US tipado (chaves checadas pelo TypeScript)
  store/               Redux Toolkit: slices, seletores memoizados, persistência, thunks
  hooks/               usePresence, useFocusTrap, useScrollLock, usePrice…
  config/site.ts       Telefone, e-mail, endereço e redes sociais
```

- **Redux**: `cart`, `wishlist`, `auth` e `ui` (gavetas, modais, moeda, idioma, avisos). O carrinho guarda só `productId` + quantidade; preços são sempre lidos do catálogo. Persistência em `localStorage` via `store/persistence.ts`, hidratada após a montagem (sem divergência de SSR).
- **Dinheiro em centavos** (inteiros), formatado com `Intl.NumberFormat`.
- **Filtros do catálogo na URL** (`/produtos?categoria=interior&preco=30-40`): compartilháveis, renderizados no servidor e funcionam sem JavaScript.
- **CSS Modules + tokens** em `globals.css` (substitui ~190 KB de SCSS por breakpoint).
- **Acessibilidade**: diálogos com foco preso e Esc, `aria-*` em abas/menus, foco visível, link "ir para o conteúdo", `prefers-reduced-motion` respeitado.

## Funcionalidades novas

Busca ao vivo (ignora acentos) · catálogo com filtros e ordenação · página de produto com cuidados, JSON-LD e relacionados · visualização rápida · carrinho em gaveta com quantidades, cupons (`VERDE10`, `BEMVINDO15`, `PLANTA20`) e persistência · checkout com validação, máscaras e confirmação · favoritos (exigem login, como no site original) · cadastro/login/recuperar senha · seletor de moeda (BRL/USD/EUR) e idioma (pt-BR/en-US) · blog com 3 artigos · newsletter validada · SEO (metadados, sitemap, robots).

## Bugs do site original corrigidos

| Problema | Correção |
| --- | --- |
| Preço lido do texto com `slice(3,5)`: quebrava com R$ 100 ou centavos | Preços numéricos em centavos no catálogo |
| Mesmo produto com preços/nomes diferentes entre abas (ex.: R$ 20 e R$ 25) | Catálogo único |
| Faixa de preço "R$ 50–60" inexistente (lacuna entre 40–50 e "mais de 60"); item de R$ 60 não aparecia em nenhuma | Faixas contíguas, testadas contra todos os produtos |
| Senhas salvas em **texto puro** no `localStorage` | PBKDF2-SHA256 com salt (Web Crypto) |
| Redirect para `http://127.0.0.1:5500/...` fixo | Roteamento do Next |
| Seletores frágeis (`aside:nth-child(8)`), `once: true` quebrando cliques repetidos | Componentes React com estado |
| Aviso "Sessão expirada" para quem nunca entrou | Mensagem clara: "Entre para salvar favoritos" |
| `</footer></footer>` e HTML duplicado | Estrutura semântica |
| Imagem do hero com 6 MB; PNGs pesados | WebP otimizado + `next/image` (hero: 6 MB → ~50 KB) |
| Fontes/ícones via CDN | Fontes self-hosted e `react-icons` |
| Texto genérico (lorem ipsum, nomes de planta inventados) | Textos reais e nomes botânicos corretos |

## Pontos a revisar antes de publicar

- **`src/config/site.ts`**: telefone, e-mail, endereço e redes são exemplos.
- **Autenticação e pedidos** são simulados no navegador (`lib/userStore.ts`, `lib/orders.ts`). Para produção, troque por uma API com sessão em cookie `httpOnly`; o restante do código não muda.
- **Câmbio** (`lib/money.ts`) usa taxas fixas e indicativas; a cobrança é em BRL.
- **Avaliações e depoimentos** em `src/data/` são de exemplo.
- A oferta "35% OFF" do hero e "40% OFF" da faixa promocional são textos de marketing do site original: ajuste conforme suas promoções reais.
- Informações de toxicidade para pets são gerais; revise com um especialista antes de divulgar.
