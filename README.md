# Imanol Lubiano — Portfolio

Web de marca personal construida con **Astro 4** + CSS puro. Sin frameworks de UI, sin dependencias innecesarias. HTML estático, carga instantánea.

## Stack

- **Astro 4** — generador de sitios estáticos
- **CSS puro** — variables, grid, animaciones
- **DM Mono + Syne + DM Sans** — tipografías via Google Fonts
- **Netlify Forms** — formulario de contacto sin backend

## Arrancar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:4321

# 3. Build de producción
npm run build

# 4. Preview del build
npm run preview
```

## Estructura

```
src/
├── data/
│   └── content.ts        ← Stack y proyectos (edita aquí)
├── layouts/
│   └── BaseLayout.astro  ← Nav, footer, SEO, fuentes
├── pages/
│   ├── index.astro       ← Página principal
│   └── 404.astro         ← Página de error
└── styles/
    └── global.css        ← Tokens, reset, utilidades
public/
└── robots.txt
```

## Personalizar contenido

Todo el contenido editable está en **`src/data/content.ts`**:

- `stack[]` — categorías y tecnologías del stack
- `projects[]` — proyectos con título, descripción, tags y estado WIP

Los textos del hero y el sobre mí están en `src/pages/index.astro`.

## Deploy

### Netlify (recomendado)
1. Conecta el repo en Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. El formulario de contacto funciona automáticamente con Netlify Forms

### Vercel
1. Importa el repo en Vercel
2. Framework preset: Astro
3. Sin configuración adicional

## SEO incluido

- Meta tags completos (title, description, canonical)
- Open Graph y Twitter Cards
- JSON-LD structured data (Person schema)
- robots.txt
- Sitemap (añadir `@astrojs/sitemap` para auto-generación)

## Añadir sitemap automático

```bash
npx astro add sitemap
```

Luego en `astro.config.mjs`:
```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://imanollubiano.dev',
  integrations: [sitemap()],
  // ...
});
```
