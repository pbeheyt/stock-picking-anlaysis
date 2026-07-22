# .gitignore

```
# Nuxt dev/build outputs
.output
.data
.nuxt
.nitro
.cache
dist

# Node dependencies
node_modules

# Logs
logs
*.log

# Misc
.DS_Store
.fleet
.idea

# Local env files
.env
.env.*
!.env.example

# Ignore codebase markdown files
codebase_*.md

```

# app/app.vue

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

```

# app/assets/css/main.css

```css
@import "tailwindcss";

```

# app/layouts/default.vue

```vue
<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 antialiased">
    <header class="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 class="text-lg font-semibold tracking-tight text-white">
          StockPick
        </h1>
        <slot name="header-actions" />
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>

```

# app/pages/confirm.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

const user = useSupabaseUser()

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
    <p class="text-sm">Authentification en cours…</p>
  </div>
</template>

```

# app/pages/index.vue

```vue
<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-1">
      <h2 class="text-2xl font-bold tracking-tight text-white">
        Dashboard
      </h2>
      <p class="text-sm text-gray-400">
        Connecté en tant que
        <span class="font-medium text-gray-200">{{ user?.email }}</span>
      </p>
    </div>

    <div class="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center text-sm text-gray-500">
      Tableau de bord en construction — les widgets arriveront au Step 2.
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        @click="signOut"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>

```

# app/pages/login.vue

```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient()

const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  })
}
</script>

<template>
  <NuxtLayout>
    <div class="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div class="w-full max-w-sm space-y-8 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tight text-white">
            Connexion
          </h2>
          <p class="text-sm text-gray-400">
            Accédez à votre tableau de bord d'investissements
          </p>
        </div>

        <button
          type="button"
          class="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @click="signInWithGoogle"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Se connecter avec Google
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

```

# codebase_tree.md

```md
.
├── app
│   ├── app.vue
│   ├── assets
│   │   └── css
│   │       └── main.css
│   ├── layouts
│   │   └── default.vue
│   └── pages
│       ├── confirm.vue
│       ├── index.vue
│       └── login.vue
├── codebase_tree.md
├── nuxt.config.ts
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── robots.txt
├── README.md
└── tsconfig.json

7 directories, 14 files

```

# nuxt.config.ts

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@nuxtjs/supabase'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'cloudflare_pages',
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/confirm'],
    },
  },

  typescript: {
    strict: true,
  },
})

```

# package.json

```json
{
  "name": "stock-picking-anlysis",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^4.5.0",
    "vue": "^3.5.40",
    "vue-router": "^5.2.0"
  },
  "devDependencies": {
    "@nuxtjs/supabase": "^2.0.9",
    "@tailwindcss/vite": "^4.3.3",
    "tailwindcss": "^4.3.3"
  }
}

```

# public/favicon.ico

This is a binary file of the type: Binary

# public/robots.txt

```txt
User-Agent: *
Disallow:

```

# README.md

```md
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

\`\`\`bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
\`\`\`

## Development Server

Start the development server on `http://localhost:3000`:

\`\`\`bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
\`\`\`

## Production

Build the application for production:

\`\`\`bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
\`\`\`

Locally preview production build:

\`\`\`bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
\`\`\`

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

```

# tsconfig.json

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}

```

